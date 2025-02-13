from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time


matches_data = []
match_entry = {
    "match_date": "", 
    "players_stats": [] 
}

website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
path = "C:\\chromedriver-win64\\chromedriver.exe"
service = Service(path)

options = Options()
""" options.add_argument('--headless')  # Run in headless mode """
options.add_argument('--disable-gpu')  # Disable GPU acceleration
options.add_argument('--disable-gpu')
options.add_argument('--ignore-certificate-errors')
options.add_argument('--disable-blink-features=AutomationControlled')  # Prevent detection
options.add_experimental_option("excludeSwitches", ["enable-automation"]) 

try:
    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,1000)
    website = 'https://www.sofascore.com/en-us/team/football/morocco/4778'
    driver.get(website)
    

    #-----------------------getting into the results tab-----------------------
    close_button = WebDriverWait(driver, 20).until( 
        EC.presence_of_element_located((By.XPATH, '//button[@class="Button RVwfR"]'))
    )
    """ close_button = WebDriverWait(driver, 20).until( 
        EC.element_to_be_clickable((By.XPATH, '//button[@class="Button RVwfR"]'))
    ) """
    close_button.click()

    match_button = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, '//a[@href="#tab:matches"]'))
    )
    match_button.click()
    results_button = driver.find_element(By.XPATH, '//button[@aria-label="Inactive chip"]')
    results_button.click()
    #-----------------------getting into the results tab-----------------------


    for _ in range(2):  # Scroll 5 times (adjust as needed)
        driver.execute_script("window.scrollBy(0, 1000);")
        time.sleep(1) 

    matches = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box klGMtt"]'))
    )
    filtered_matches = matches[4:9]
    """ for match in filtered_matches: """
    #----------------------------------------inside the loop-----------------------------------------------------
    date = filtered_matches[0].find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
    print(date)
    driver.execute_script("window.scrollTo(0, 0);")  # Scroll to the top
    time.sleep(2) 
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", filtered_matches[0]) # scroll to the container
    time.sleep(1)
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(filtered_matches[0]))
    filtered_matches[0].click() # click on the match container

    Lineups =WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//h2[@data-tabid="lineups"]')))
    Lineups.click()

    players = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, '//div[@cursor="pointer"]')))
    print(len(players)) #37 parts, we need only of the first 11
    filtered_players = players[:11]
    for player in filtered_players:
        #----------------------------------------inside nested loop--------------------------------------------------
        player_element = player.find_element(By.CLASS_NAME, "Text.iDqCDP")
        # Extract the number
        number_element = player_element.find_element(By.CLASS_NAME, "Text.wezlr")
        player_number = number_element.text
        # Extract the name
        player_name = player_element.text.replace(player_number, '').strip()
        print("Player Number:", player_number) 
        print("Player Name:", player_name) 
        player.click()

        #____________________________passing to extract the player stats_____________________________
        wait = WebDriverWait(driver, 10) 
        # Stats to scrape (corrected based on your model)
        stats_to_scrape = [
            "Minutes played", 
            "Shots on target", 
            "Shots off target", 
            "Shots blocked", 
            "Dribble attempts (succ.)", 
            "Touches", 
            "Accurate passes", 
            "Key passes", 
            "Crosses (acc.)", 
            "Long balls (acc.)", 
            "Clearances", 
            "Blocked shots", 
            "Interceptions", 
            "Total tackles", 
            "Dribbled past", 
            "Ground duels (won)", 
            "Aerial duels (won)", 
            "Fouls", 
            "Was fouled"
        ]

        for stat_name in stats_to_scrape:
            try:
                # Locate the stat element based on the stat name and extract its value
                stat_element = wait.until(EC.presence_of_element_located(
                (By.XPATH, f'//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="{stat_name}"]]/span')
                ))
                stat_value = stat_element.text  # Get the stat value
                # Extract only numbers using regex
                cleaned_value = re.findall(r'\d+', stat_value)  # Finds all numbers in the text
                
                # Convert to an integer if there's a number found, else set it to 0
                final_value = int(cleaned_value[0]) if cleaned_value else 0  

                print(f'{stat_name}: {final_value}')  # Print cleaned stat
            except Exception as e:
                print(f'Error extracting {stat_name}: {e}')
                
        close_button = player.find_element(By.XPATH, '//button[contains(@class, "Button RVwfR")]')
        close_button.click()

    



    time.sleep(50)
    driver.quit()
except Exception as e:
    print(f'an error happened ====> {e}')

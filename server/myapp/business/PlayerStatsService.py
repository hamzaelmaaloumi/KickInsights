import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
from datetime import datetime
import sys
import os
import django
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')  # Replace with your actual settings path
django.setup()
from myapp.dal import PlayerDao, TeamDao, MatcheDao, LeagueDao, PlayerStatsDao
from datetime import datetime
from dateutil.relativedelta import relativedelta

month_translation = {
    "janv.": "01",
    "févr.": "02",
    "mars": "03",
    "avr.": "04",
    "mai": "05",
    "juin": "06",
    "juil.": "07",
    "août": "08",
    "sept.": "09",
    "oct.": "10",
    "nov.": "11",
    "déc.": "12"
}

@staticmethod
def get_all_player_stats():
    try:
        playerstats = PlayerStatsDao.get_all_player_stats()
        return playerstats
    except Exception as e:
        raise e


@staticmethod
def get_all_goalkeeper_stats():
    try:
        goalkeeperstats = PlayerStatsDao.get_all_goalkeeper_stats()
        return goalkeeperstats
    except Exception as e:
        raise e
    
@staticmethod
def scrap_players_stats():
    PlayerStatsDao.clear_players()
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = "C:\\chromedriver-win64\\chromedriver.exe"
    service = Service(path)

    options = Options()
    options.add_argument('--headless')  # Run in headless mode
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

        players_data = []
        
        for i in range(4,6):
            driver.execute_script("window.scrollTo(0, 0);") 

            for _ in range(2):  # Scroll 5 times (adjust as needed)
                driver.execute_script("window.scrollBy(0, 1000);")
                time.sleep(1) 
            matches = WebDriverWait(driver, 20).until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box klGMtt"]'))
            )
            print(f'-------------------------{len(matches)}-------------------------')
            match = matches[i]
            
            scraped_date = match.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
            matcheDate = datetime.strptime(scraped_date, "%m/%d/%y").date()
            scarped_match = MatcheDao.get_matche_by_date(matcheDate)
            print(matcheDate)

            driver.execute_script("window.scrollTo(0, 0);")  # Scroll to the top
            time.sleep(2) 
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", match) # scroll to the container
            time.sleep(1)
            WebDriverWait(driver, 10).until(EC.element_to_be_clickable(match))
            match.click() # click on the match container

            Lineups =WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//h2[@data-tabid="lineups"]')))
            Lineups.click() 

            players = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, '//div[@cursor="pointer"]')))
            print(len(players)) #37 parts, we need only of the first 11 or next 11
            team = driver.find_elements(By.XPATH, '//div[contains(@class, "Box Flex erDhMs ldrrwc")]/div/div/div/span')[0].text
            if team == 'Morocco':
                filtered_players = players[1:11]
            else:
                filtered_players = players[12:22]
            for player in filtered_players:
                # Scroll to bring the player into view
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", player)
                player_element = player.find_element(By.CLASS_NAME, "Text.iDqCDP")
                # Extract the number
                number_element = player_element.find_element(By.CLASS_NAME, "Text.wezlr")
                player_number = number_element.text
                print("Player Number:", player_number) 
                player.click()

                #____________________________passing to extract the player stats_____________________________
                # Extract the name
                scraped_name = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//div/div[contains(@class, "Box Flex ggRYVx fRroAj")]/a/div'))
                )
                player_name = scraped_name.text
                print(f'------------------------------------------{player_name}-------------------------------------------')
                aimed_player = PlayerDao.get_player_by_name(player_name)
                if aimed_player is not None:
                    print(f'-----------------------------------------{aimed_player.position}-----------------------------------')
                else: #else will be displayed because player model is empty, you gotta fill it
                    print("-----------------------------------------player not found-----------------------------------")
                scraped_rating = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//div[@display="flex"]/span[@class="Text eFIteU"]/div/span'))
                )
                rating = driver.execute_script("return arguments[0].innerText;", scraped_rating)
                print(f'----------------------------------------RATING: {rating}-----------------------------------')

                wait = WebDriverWait(driver, 10) 
                # Stats to scrape (corrected based on your model)
                stats_to_scrape = [
                    "minutes_played",
                    "shots_on_target",
                    "shots_off_target",
                    "shots_blocked",
                    "dribble_attempts_successful",
                    "touches",
                    "accurate_passes",
                    "key_passes",
                    "crosses_accurate",
                    "long_balls_accurate",
                    "ground_duels_won",
                    "aerial_duels_won",
                    "fouls",
                    "was_fouled",
                    "clearances",
                    "interceptions",
                    "total_tackles",
                    "dribbled_past"
                ]

                stat_name_mapping = {
                    "minutes_played": "Minutes played",
                    "shots_on_target": "Shots on target",
                    "shots_off_target": "Shots off target",
                    "shots_blocked": "Shots blocked",
                    "dribble_attempts_successful": "Dribble attempts (succ.)",
                    "touches": "Touches",
                    "accurate_passes": "Accurate passes",
                    "key_passes": "Key passes",
                    "crosses_accurate": "Crosses (acc.)",
                    "long_balls_accurate": "Long balls (acc.)",
                    "ground_duels_won": "Ground duels (won)",
                    "aerial_duels_won": "Aerial duels (won)",
                    "fouls": "Fouls",
                    "was_fouled": "Was fouled",
                    "clearances": "Clearances",
                    "interceptions": "Interceptions",
                    "total_tackles": "Total tackles",
                    "dribbled_past": "Dribbled past"
                }

                
                try:
                    player_row = {"player": aimed_player.pk, "match": scarped_match.pk, "rating": float(rating)}
                except:
                    continue

                for stat_name in stats_to_scrape:
                    try:
                        html_stat_name = stat_name_mapping.get(stat_name, stat_name)

                        # Locate the stat element based on the stat name and extract its value
                        stat_element = wait.until(EC.presence_of_element_located(
                            (By.XPATH, f'//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="{html_stat_name}"]]/span')
                        ))
                        stat_value = stat_element.text  # Get the raw stat value

                        # Special handling for accurate_passes / total_passes
                        if stat_name == "accurate_passes":
                            match = re.findall(r'(\d+)/(\d+)', stat_value)  # Extract "53/56" numbers
                            if match:
                                accurate, total = map(int, match[0])
                                player_row.update({"accurate_passes": accurate, "total_passes": total})
                            else:
                                player_row.update({"accurate_passes": 0, "total_passes": 0})  # Default if parsing fails

                        else:
                            # Extract only numbers using regex for other stats
                            cleaned_value = re.findall(r'\d+', stat_value)
                            final_value = int(cleaned_value[0]) if cleaned_value else 0  
                            player_row.update({stat_name: final_value})

                    except Exception as e:
                        player_row.update({stat_name: 0})

                PlayerStatsDao.add_player_stats(player_row)  
                close_button = player.find_element(By.XPATH, '//button[contains(@class, "Button RVwfR")]')
                close_button.click()
            #---------------------------------------getting substituted players data----------------------------------------
            morocco_element = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//div[img[contains(@alt, 'Morocco')][@class='Img fTultb']]"))
            )
            
            driver.execute_script("arguments[0].scrollIntoView();", morocco_element)
            morocco_element.click()
            

            #avoiding stale element after clicking on morocco tab
            players = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, '//div[@cursor="pointer"]')))
            sub_players = players[24:30]
            
            for player in sub_players:
                
                # Scroll to bring the player into view
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", player)
                
                # Extract the number
                player_number = player.find_element(By.XPATH, './/bdi[@class="Box ewxwAz"]').text
                print("Player Number:", player_number) 
                player.click()
                #-------------check if the player is not substituted
                try: 
                    WebDriverWait(driver, 10).until(
                        EC.presence_of_element_located((By.XPATH, '//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="Minutes played"]]/span'))
                    )
                except:
                    break
                #-------------make sure that substituted player is not a goalkeeper
                try:
                    WebDriverWait(driver, 5).until(
                        EC.presence_of_element_located((By.XPATH, '//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="Saves"]]/span'))
                    )
                    continue
                except:
                    pass
                # Extract the name
                scraped_name = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//div/div[contains(@class, "Box Flex ggRYVx fRroAj")]/a/div'))
                )
                player_name = scraped_name.text
                aimed_player = PlayerDao.get_player_by_name(player_name)
                if aimed_player is not None:
                    print(f'-----------------------------------------{aimed_player.position}-----------------------------------')
                else: #else will be displayed because player model is empty, you gotta fill it
                    print("-----------------------------------------player not found-----------------------------------")
                scraped_rating = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//div[@display="flex"]/span[@class="Text eFIteU"]/div/span'))
                )
                rating = driver.execute_script("return arguments[0].innerText;", scraped_rating)
                print(f'----------------------------------------RATING: {rating}-----------------------------------')


                wait = WebDriverWait(driver, 10) 
                # Stats to scrape (corrected based on your model)
                stats_to_scrape = [
                    "minutes_played",
                    "shots_on_target",
                    "shots_off_target",
                    "shots_blocked",
                    "dribble_attempts_successful",
                    "touches",
                    "accurate_passes",
                    "key_passes",
                    "crosses_accurate",
                    "long_balls_accurate",
                    "ground_duels_won",
                    "aerial_duels_won",
                    "fouls",
                    "was_fouled",
                    "clearances",
                    "interceptions",
                    "total_tackles",
                    "dribbled_past"
                ]

                stat_name_mapping = {
                    "minutes_played": "Minutes played",
                    "shots_on_target": "Shots on target",
                    "shots_off_target": "Shots off target",
                    "shots_blocked": "Shots blocked",
                    "dribble_attempts_successful": "Dribble attempts (succ.)",
                    "touches": "Touches",
                    "accurate_passes": "Accurate passes",
                    "key_passes": "Key passes",
                    "crosses_accurate": "Crosses (acc.)",
                    "long_balls_accurate": "Long balls (acc.)",
                    "ground_duels_won": "Ground duels (won)",
                    "aerial_duels_won": "Aerial duels (won)",
                    "fouls": "Fouls",
                    "was_fouled": "Was fouled",
                    "clearances": "Clearances",
                    "interceptions": "Interceptions",
                    "total_tackles": "Total tackles",
                    "dribbled_past": "Dribbled past"
                }

                try:
                    player_row = {"player": aimed_player.pk, "match": scarped_match.pk, "rating": float(rating)}
                except:
                    continue

                for stat_name in stats_to_scrape:
                    try:
                        html_stat_name = stat_name_mapping.get(stat_name, stat_name)

                        # Locate the stat element based on the stat name and extract its value
                        stat_element = wait.until(EC.presence_of_element_located(
                            (By.XPATH, f'//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="{html_stat_name}"]]/span')
                        ))
                        stat_value = stat_element.text  # Get the raw stat value

                        # Special handling for accurate_passes / total_passes
                        if stat_name == "accurate_passes":
                            match = re.findall(r'(\d+)/(\d+)', stat_value)  # Extract "53/56" numbers
                            if match:
                                accurate, total = map(int, match[0])
                                player_row.update({"accurate_passes": accurate, "total_passes": total})
                            else:
                                player_row.update({"accurate_passes": 0, "total_passes": 0})  # Default if parsing fails

                        else:
                            # Extract only numbers using regex for other stats
                            cleaned_value = re.findall(r'\d+', stat_value)
                            final_value = int(cleaned_value[0]) if cleaned_value else 0  
                            player_row.update({stat_name: final_value})

                    except Exception as e:
                        player_row.update({stat_name: 0})

                PlayerStatsDao.add_player_stats(player_row)
                close_button = player.find_element(By.XPATH, '//button[contains(@class, "Button RVwfR")]')
                close_button.click()


            #_______go back to the the fixtrues tab again_____
            driver.back()
            time.sleep(5)
            #skip an unexpected pop
            expected_popup_1 = driver.find_elements(By.XPATH, "//li[@class='sc-d9e2068a-2 ibVdwD']")
            if len(expected_popup_1) != 0:
                expected_popup_1[1].click()
            try:
                expected_popup_2 = driver.find_element(By.XPATH, '//button[@class="Button gTStrj"]')
                expected_popup_2.click()
            except:
                pass

            results_tab = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, '//button[contains(@class, "Chip hBXmOq")]'))
            )
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", results_tab) 
            
            results_tab.click()

        print("everything above worked well")



        driver.quit()
    except Exception as e:
        print(f'a temporary error happened, please try again later, make sure your connection is stable')
        raise e

@staticmethod
def scrap_goalkeeper_stats():
    PlayerStatsDao.clear_goalkeepers()
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = "C:\\chromedriver-win64\\chromedriver.exe"
    service = Service(path)

    options = Options()
    options.add_argument('--headless')  # Run in headless mode
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

        players_data = []
        
        for i in range(4,7):
            driver.execute_script("window.scrollTo(0, 0);") 

            for _ in range(2):  # Scroll 5 times (adjust as needed)
                driver.execute_script("window.scrollBy(0, 1000);")
                time.sleep(1) 
            matches = WebDriverWait(driver, 20).until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box klGMtt"]'))
            )
            print(f'-------------------------{len(matches)}-------------------------')
            match = matches[i]
            
            scraped_date = match.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
            matcheDate = datetime.strptime(scraped_date, "%m/%d/%y").date()
            scarped_match = MatcheDao.get_matche_by_date(matcheDate)
            print(matcheDate)

            driver.execute_script("window.scrollTo(0, 0);")  # Scroll to the top
            time.sleep(2) 
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", match) # scroll to the container
            time.sleep(1)
            WebDriverWait(driver, 10).until(EC.element_to_be_clickable(match))
            match.click() # click on the match container

            Lineups =WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//h2[@data-tabid="lineups"]')))
            Lineups.click() 

            players = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, '//div[@cursor="pointer"]')))
            print(len(players)) #37 parts, we need only of the first 11 or next 11
            team = driver.find_elements(By.XPATH, '//div[contains(@class, "Box Flex erDhMs ldrrwc")]/div/div/div/span')[0].text
            if team == 'Morocco':
                player = players[0]
            else:
                player = players[11]
            # Scroll to bring the player into view
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", player)
            player_element = player.find_element(By.CLASS_NAME, "Text.iDqCDP")
            # Extract the number
            number_element = player_element.find_element(By.CLASS_NAME, "Text.wezlr")
            player_number = number_element.text
            print("Player Number:", player_number) 
            player.click()

            #____________________________passing to extract the player stats_____________________________
            # Extract the name
            scraped_name = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//div/div[contains(@class, "Box Flex ggRYVx fRroAj")]/a/div'))
            )
            player_name = scraped_name.text
            print(f'-----------------------------------------{player_name}-----------------------------------')
            aimed_player = PlayerDao.get_player_by_name(player_name)
            if aimed_player is not None:
                print(f'-----------------------------------------{aimed_player.position}-----------------------------------')
            else: #else will be displayed because player model is empty, you gotta fill it
                print("-----------------------------------------player not found-----------------------------------")
            scraped_rating = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, '//div[@display="flex"]/span[@class="Text eFIteU"]/div/span'))
            )
            rating = driver.execute_script("return arguments[0].innerText;", scraped_rating)
            print(f'----------------------------------------RATING: {rating}-----------------------------------')

            wait = WebDriverWait(driver, 10) 
            stats_to_scrape = [
                "minutes_played",
                "saves",
                "saves_from_inside_box",
                "clearances",
                "blocked_shots",
                "shots_on_target",
                "shots_off_target"
            ]

            stat_name_mapping = {
                "minutes_played": "Minutes played",
                "saves": "Saves",
                "saves_from_inside_box": "Saves from inside box",
                "clearances": "Clearances",
                "blocked_shots": "Blocked shots",
                "shots_on_target": "Shots on target",
                "shots_off_target": "Shots off target"
            }

            try:
                player_row = {"player": aimed_player.pk, "match": scarped_match.pk, "rating": float(rating)}
            except:
                continue

            for stat_name in stats_to_scrape:
                try:

                    html_stat_name = stat_name_mapping.get(stat_name, stat_name) 

                    # Locate the stat element based on the stat name and extract its value
                    stat_element = wait.until(EC.presence_of_element_located(
                    (By.XPATH, f'//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="{html_stat_name}"]]/span')
                    ))
                    stat_value = stat_element.text  # Get the stat value
                    # Extract only numbers using regex
                    cleaned_value = re.findall(r'\d+', stat_value)  # Finds all numbers in the text
                    
                    # Convert to an integer if there's a number found, else set it to 0
                    final_value = int(cleaned_value[0]) if cleaned_value else 0  

                    player_row.update({stat_name: int(final_value)})  # Print cleaned stat
                except Exception as e:
                    player_row.update({stat_name: 0})
                    
            PlayerStatsDao.add_goalkeeper_stats(player_row)          
            close_button = player.find_element(By.XPATH, '//button[contains(@class, "Button RVwfR")]')
            close_button.click()

            #---------------------------------------getting substituted goalkeeper data----------------------------------------
            morocco_element = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//div[img[contains(@alt, 'Morocco')][@class='Img fTultb']]"))
            )
            driver.execute_script("arguments[0].scrollIntoView();", morocco_element)
            morocco_element.click()

            #avoiding stale element after clicking on morocco tab
            players = WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.XPATH, '//div[@cursor="pointer"]')))
            sub_players = players[24:30]
            for player in sub_players:
                # Scroll to bring the player into view
                driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", player)
                # Extract the number
                player_number = player.find_element(By.XPATH, './/bdi[@class="Box ewxwAz"]').text
                print("Player Number:", player_number) 
                try: 
                    player.click()
                except:
                    pass
                #-------------check if the player is not substituted
                try: 
                    WebDriverWait(driver, 2).until(
                        EC.presence_of_element_located((By.XPATH, '//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="Minutes played"]]/span'))
                    )
                except:
                    break
                #-------------make sure that substituted player is a goalkeeper
                try:
                    WebDriverWait(driver, 2).until(
                        EC.presence_of_element_located((By.XPATH, '//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="Saves"]]/span'))
                    )
                except:
                    print("----------------------------------not a goalkeeper---------------------------------------")
                    continue
                # Extract the name
                scraped_name = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//div/div[contains(@class, "Box Flex ggRYVx fRroAj")]/a/div'))
                )
                player_name = scraped_name.text
                aimed_player = PlayerDao.get_player_by_name(player_name)
                if aimed_player is not None:
                    print(f'-----------------------------------------{aimed_player.position}-----------------------------------')
                else: #else will be displayed because player model is empty, you gotta fill it
                    print("-----------------------------------------player not found-----------------------------------")
                scraped_rating = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//div[@display="flex"]/span[@class="Text eFIteU"]/div/span'))
                )
                rating = driver.execute_script("return arguments[0].innerText;", scraped_rating)
                print(f'----------------------------------------RATING: {rating}-----------------------------------')


                wait = WebDriverWait(driver, 10) 
                # Stats to scrape (corrected based on your model)
                stats_to_scrape = [
                    "minutes_played",
                    "saves",
                    "saves_from_inside_box",
                    "clearances",
                    "blocked_shots",
                    "shots_on_target",
                    "shots_off_target"
                ]

                stat_name_mapping = {
                    "minutes_played": "Minutes played",
                    "saves": "Saves",
                    "saves_from_inside_box": "Saves from inside box",
                    "clearances": "Clearances",
                    "blocked_shots": "Blocked shots",
                    "shots_on_target": "Shots on target",
                    "shots_off_target": "Shots off target"
                }
                
                try:
                    player_row = {"player": aimed_player.pk, "match": scarped_match.pk, "rating": float(rating)}
                except:
                    continue

                for stat_name in stats_to_scrape:
                    try:

                        html_stat_name = stat_name_mapping.get(stat_name, stat_name) 

                        # Locate the stat element based on the stat name and extract its value
                        stat_element = wait.until(EC.presence_of_element_located(
                        (By.XPATH, f'//div[contains(@class, "Box Flex dlyXLO bnpRyo")][div[text()="{html_stat_name}"]]/span')
                        ))
                        stat_value = stat_element.text  # Get the stat value
                        # Extract only numbers using regex
                        cleaned_value = re.findall(r'\d+', stat_value)  # Finds all numbers in the text
                        
                        # Convert to an integer if there's a number found, else set it to 0
                        final_value = int(cleaned_value[0]) if cleaned_value else 0  

                        player_row.update({stat_name: int(final_value)})  # Print cleaned stat
                    except Exception as e:
                        player_row.update({stat_name: 0})

                PlayerStatsDao.add_goalkeeper_stats(player_row)
                close_button = player.find_element(By.XPATH, '//button[contains(@class, "Button RVwfR")]')
                close_button.click()



            #_______go back to the the fixtrues tab again_____
            driver.back()
            time.sleep(5)
            #skip an unexpected pop
            expected_popup_1 = driver.find_elements(By.XPATH, "//li[@class='sc-d9e2068a-2 ibVdwD']")
            if len(expected_popup_1) != 0:
                expected_popup_1[1].click()
            try:
                expected_popup_2 = driver.find_element(By.XPATH, '//button[@class="Button gTStrj"]')
                expected_popup_2.click()
            except:
                pass

            results_tab = WebDriverWait(driver, 5).until(
                EC.element_to_be_clickable((By.XPATH, '//button[contains(@class, "Chip hBXmOq")]'))
            )
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", results_tab) 
            
            results_tab.click()

        print("everything above worked well")



        driver.quit()
    except Exception as e:
        print(f'a temporary error happened, please try again later, make sure your connection is stable')
        raise e

def player_stats_with_morocco() :
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
        
        

STAT_MAPPING = {
    "Minutes jouées": "minutes_joues",
    "Buts": "but",
    "Buts attendus (xG)": "but_attendus",
    "Passe décisive": "passes_decisive",
    "Touches": "touches",
    "Passes précises": "passes_precises",
    "Passes clés": "passes_cles",
    "Centres (ratio)": "centres",
    "Passes en profondeur (ratio)": "passes_en_profondeur",
    "Tirs cadrés": "tirs_cadres",
    "Tirs non cadrés": "tirs_non_cadres",
    "Tirs bloqués": "tirs_bloques",
    "Tentatives de dribble (reuss.)": "tentatives_de_dribble",
    "Duels au sol (remportés)": "duels_au_sol",
    "Duels aériens (remportés)": "duels_aeriennes",
    "Perte de balle": "perte_de_balle",
    "Tacles reçus": "tacles_recus",
    "Fautes": "fautes",
    "Dégagements": "degagements",
    "Interceptions": "interceptions",
    "Tacles totaux": "tacles_totaux",
    "Dribbles subis": "dribbles_subis",
    "Grosses occasions créées": "grosses_occasions_crees",
    "Hors-jeux": "hors_jeux",
    "Sauvés": "sauves",
    "Dégagements des poings": "degagements_des_poings",
    "Sorties (réussies)": "sorties",
    "Sorties aériennes": "sorties_aeriennes",
}

@staticmethod
def scrap_players_stats_with_teams():
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'  
    service = Service(path)

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    prefs = {
        "profile.managed_default_content_settings.stylesheets": 2,
        "profile.managed_default_content_settings.images": 1, 
        "profile.managed_default_content_settings.fonts": 2, 
        "profile.managed_default_content_settings.plugins": 2, 
        "profile.managed_default_content_settings.popups": 2,  
        "profile.managed_default_content_settings.geolocation": 2,  
        "profile.managed_default_content_settings.notifications": 2, 
        "profile.managed_default_content_settings.automatic_downloads": 2      
    }
    options.add_experimental_option("prefs", prefs)

    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800, 600)
    
    links = PlayerDao.get_players_links()
    stats = []

    try:
        for link in links:
            try:
                print("\n")
                driver.get(link)
                
                # Get player name
                player_name = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, '//h2[@class="Text cuNqBu"]'))
                )
                print(player_name.text)
                player = PlayerDao.get_player_by_name(player_name.text)
                
                # Click statistics button
                statsButton = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, '//a[@href="#tab:statistics"]'))
                )
                statsButton.click()
                print("stats button is clicked")
                
                # Open dropdown and get list items
                SelectButton = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, '//button[@class="DropdownButton jQruaf"]'))
                )
                driver.execute_script("arguments[0].scrollIntoView();", SelectButton)
                driver.execute_script("arguments[0].click();", SelectButton)
                print("select button is clicked to get the length of all leagues that exists")
                
                listItems = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.XPATH, '//li[contains(@class, "DropdownItem")]'))
                )
                
                # Close dropdown
                driver.execute_script("arguments[0].click();", SelectButton)
                print("the drop down is closed")
                
                # Iterate over list items
                for i in range(len(listItems)):
                    player_statistique = {} 
                    
                    # Reopen dropdown and select the current item
                    SelectButton = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable((By.XPATH, '//button[@class="DropdownButton jQruaf"]'))
                    )
                    driver.execute_script("arguments[0].click();", SelectButton)
                    
                    listItems = WebDriverWait(driver, 10).until(
                        EC.presence_of_all_elements_located((By.XPATH, '//li[contains(@class, "DropdownItem")]'))
                    )
                    
                    driver.execute_script("arguments[0].click();", listItems[i])
                    print("A league has been chosen")
                    time.sleep(3)
                    
                    # Process league data
                    season_elements = driver.find_elements(By.XPATH, '//div[@class="Box Flex eJCdjm bnpRyo"]')
                    if len(season_elements) > 1 and "24/25" in season_elements[1].text: 
                        try:
                            league_name = WebDriverWait(driver, 10).until(
                                EC.presence_of_element_located((By.XPATH, '//bdi[contains(@class, "Text")]'))
                            ).text
                            
                            listItems = WebDriverWait(driver, 10).until(
                                EC.presence_of_all_elements_located((By.XPATH, './/div[@class="Box kWQyve" or @class="Box gEQWLR" or @class="Box egJOel"]'))
                            )
                         
                            adversaire = listItems[-1].find_element(By.XPATH, './/img[@class="Img fTultb"]')
                            adversaire_image = adversaire.get_attribute("src")
                            adversaire_name = adversaire.get_attribute("alt")
                            print(adversaire_name)
                            
                            if TeamDao.get_team_by_name(adversaire_name) is None:
                                TeamDao.add_team({"image": adversaire_image, "name": adversaire_name, "type": "club"})
                            
                            ratings = WebDriverWait(driver, 10).until(
                                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box gRFdPz"]//span//div[contains(@class,"Box klGMtt")]'))
                            )
                            if ratings:
                                after_text = driver.execute_script(
                                    "return window.getComputedStyle(arguments[0], '::after').content;", ratings[-1]
                                )
                                if not after_text:
                                    after_text = ratings[-1].find_element(By.TAG_NAME, 'span').text
                                
                                print("rating is : " + after_text)
                                    
                            else:
                                print("No rating elements found.")                          
                            
                            driver.execute_script("arguments[0].click();", listItems[-1])
                            match_text = WebDriverWait(driver, 15).until(
                                EC.presence_of_element_located((By.XPATH, '//div[@class="Text ietmmf"]'))
                            )
                            print(1)
                            match_pattern = r"^(.*?) (\d+) - (\d+) (.*?)$"
                            match = re.match(match_pattern, match_text.text)
                            if match:
                                teamA = match.group(1).strip()
                                scoreA = int(match.group(2))
                                scoreB = int(match.group(3))
                                teamB = match.group(4).strip()
                            
                            print(teamA)
                            print(scoreA)
                            print(scoreB)
                            print(teamB)
                                
                            date = driver.find_element(By.XPATH, '//div[@class="Text cpgWYn"]')
                            parts = date.text.split()
                            day = parts[0]
                            month_abbr = parts[1]
                            
                            if len(parts) == 3:
                                year = "20" + parts[2] 
                            else:
                                year = str(datetime.now().year) 
                            
                            month = month_translation.get(month_abbr, "")
                            formatted_date = datetime.strptime(f"{year}-{month}-{day.zfill(2)}", "%Y-%m-%d").date()
                            
                            print(formatted_date)
                
                            teamA = TeamDao.get_team_by_name(teamA)
                            if teamA is None:
                                print(f"Team A not found: {teamA}")
                                continue
                            
                            teamB = TeamDao.get_team_by_name(teamB)
                            if teamB is None:
                                print(f"Team B not found: {teamB}")
                                continue
                            
                            league = LeagueDao.get_league_by_name(league_name)
                            if league is None:
                                print(f"League not found: {league_name}")
                                continue
                            
                            matche = {
                                "league": league.pk,
                                "date": formatted_date,
                                "teamA": teamA.pk,
                                "teamB": teamB.pk,
                                "scoreA": scoreA,
                                "scoreB": scoreB
                            }
                            
                            print(matche)
                            matcheID = MatcheDao.addMatche(matche)
                            
                            if matcheID is not None:
                                keys = driver.find_elements(By.XPATH, '//div[@class="Text dgWCMi"]')
                                values = driver.find_elements(By.XPATH, '//span[@class="Text iescdy"]')
                                
                                player_statistique["player"] = player.pk
                                player_statistique["match"] = MatcheDao.get_matche_by_id(matcheID).pk
                                player_statistique["note"] = after_text.strip('\"')
                                
                                for k, v in zip(keys, values):
                                    if k.text in STAT_MAPPING:
                                        player_statistique[STAT_MAPPING[k.text]] = v.text
                                        
                                print(player_statistique)
                                        
                                PlayerStatsDao.add_player_stats_with_team(player_statistique)
                                
                                stats.append(player_statistique)
                            
                            exitButton = WebDriverWait(driver, 10).until(
                                EC.element_to_be_clickable((By.XPATH, '//button[@class="Button RVwfR"]'))
                            )
                            exitButton.click() 
                            
                        except Exception as e:
                            print(f"Error handling dropdown on : {e}")
                    else:
                        print("the loop is breaked")
                        break
                                               

            except Exception as e:
                print(f"problem : {e}")
            finally :
                time.sleep(3) 
                continue
                
    except Exception as e:
        print(f"problem : {e}")
        
    finally: 
        driver.quit()
        return stats

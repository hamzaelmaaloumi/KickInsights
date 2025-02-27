import sys
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
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

from myapp.dal import LeagueDao, PlayerDao
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from myapp.presentation import serializers
from datetime import datetime

@staticmethod
def get_league_by_id(leagueID) :
    return LeagueDao.get_league_by_id(leagueID)

@staticmethod
def get_league_by_name(name):
    return LeagueDao.get_league_by_name(name)

@staticmethod
def getAllLeagues() :
    return LeagueDao.getAllLeagues()

@staticmethod
def addLeague(league) :
    return LeagueDao.addLeague(league)

@staticmethod
def deleteLeague(name) :
    return LeagueDao.deleteLeague(name)

@staticmethod
def scraping_leagues() :
    website = "https://www.sofascore.com/fr/equipe/football/morocco/4778#tab:matches"
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)

    options = Options()
    options.add_argument('--headless') 
    options.add_argument('--disable-gpu')

    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,600)

    driver.get(website)
    time.sleep(2)
    
    allMatches = driver.find_element(By.XPATH, '//button[@class="Chip hBXmOq"]')
    allMatches.click()
    
    parts = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box iuXXsV"]'))
    )
    
    leagues = []
    dateFormat = "%d/%m/%y"
    
    constDate = datetime.strptime('01/01/24',dateFormat)
    
    for part in parts :
        try :
            date = part.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
            formatted_date = datetime.strptime(date, dateFormat)
            if formatted_date >= constDate :
                league_name = part.find_element(By.XPATH, './/bdi[@class="Text cUmrHt"]')
                image = part.find_element(By.XPATH, './/img[contains(@class, "Img")]')
                print(league_name.text)
                print(image.get_attribute("src"))
                if ({"league_name" : league_name.text , "image" : image.get_attribute("src")}) not in leagues :
                    leagues.append({"league_name" : league_name.text , "image" : image.get_attribute("src")})
        except :
            continue
    
    driver.quit()
    
    for league in leagues :
        try:
            if LeagueDao.get_league_by_name(league["league_name"]) is None :
                LeagueDao.addLeague(league)
        except Exception as e:
            print(f"problem while inserting league : {e}")
    
    return leagues

@staticmethod
def scrap_players_leagues():
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'  
    service = webdriver.chrome.service.Service(path)

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')  
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')

    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800, 600)

    links = PlayerDao.get_players_links()
    
    leagues = []

    for link in links:
        try :
            driver.get(link)
            time.sleep(2)
            try:
                statsButton = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, '//a[@href="#tab:statistics"]'))
                )
                statsButton.click()
                print("stats button is clicked")
            except Exception as e:
                print(f"Error clicking statistics button on {link}: {e}")
                continue  

            try:
                SelectButton = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, '//button[@class="DropdownButton jQruaf"]'))
                )
                driver.execute_script("arguments[0].scrollIntoView();", SelectButton)
                driver.execute_script("arguments[0].click();", SelectButton)
                print("select button is clicked to get the length of all leagues that exists")
                
                listItems = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.XPATH, '//li[contains(@class, "DropdownItem")]'))
                )
                
                SelectButton = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.XPATH, '//button[@class="DropdownButton jQruaf"]'))
                )
                driver.execute_script("arguments[0].scrollIntoView();", SelectButton)
                driver.execute_script("arguments[0].click();", SelectButton)
                print("the drop down is closed")
                
                for i in range(len(listItems)):
                    SelectButton = WebDriverWait(driver, 10).until(
                        EC.element_to_be_clickable((By.XPATH, '//button[@class="DropdownButton jQruaf"]'))
                    )
                    driver.execute_script("arguments[0].click();", SelectButton)

                    listItems = WebDriverWait(driver, 10).until(
                        EC.presence_of_all_elements_located((By.XPATH, '//li[contains(@class, "DropdownItem")]'))
                    )
                    
                    driver.execute_script("arguments[0].click();", listItems[i])

                    season_elements = driver.find_elements(By.XPATH, '//div[@class="Box Flex eJCdjm bnpRyo"]')
                    if len(season_elements) > 1 and "24/25" in season_elements[1].text:  
                        league_name = WebDriverWait(driver, 10).until(
                            EC.presence_of_element_located((By.XPATH, '//bdi[contains(@class, "Text")]'))
                        ).text
                        league_image = driver.find_element(By.XPATH, '//img[@class="Img jDEQxe"]').get_attribute("src")
                        league = {"league_name": league_name,"image": league_image}
                        if league not in leagues :
                            leagues.append(league)
                            try :
                                LeagueDao.addLeague(league)
                            except Exception as e:
                                print("problem while inserting the league of a player")
                    else :
                        print("the loop is breaked")
                        break                        

            except Exception as e:
                print(f"Error handling dropdown on {link}: {e}")
        
        except Exception as e:
            print(f"problem : {e}")

    driver.quit()
    return leagues  


#scraping_leagues()
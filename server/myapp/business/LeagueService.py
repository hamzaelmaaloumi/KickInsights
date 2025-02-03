from myapp.dal import LeagueDao
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


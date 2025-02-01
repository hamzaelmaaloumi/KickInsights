from myapp.dal import PlayerDao
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from myapp.presentation import serializers

@staticmethod
def get_player_by_id(playerID) :
    return PlayerDao.get_player_by_id(playerID)

@staticmethod
def get_player_by_name(name):
    return PlayerDao.get_player_by_name(name)

@staticmethod
def getAllPlayers() :
    return PlayerDao.getAllPlayers()

@staticmethod
def addPlayer(player) :
    return PlayerDao.addPlayer(player)

@staticmethod
def deletePlayer(name) :
    return PlayerDao.deletePlayer(name)

@staticmethod
def scraping_players() :
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--disable-web-security')

    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,600)

    driver.get(website)
    time.sleep(2)

    players_link = driver.find_element(By.XPATH, '//a[@href="#tab:squad"]')
    players_link.click()
    
    time.sleep(2)
        
    parts = WebDriverWait(driver,10).until(
        EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box eEJLdF"]'))
    )
        
    players = []
        
    for part in parts:
        try :
            post = part.find_element(By.XPATH, './/div[@class="Box Flex jilvhL jLRkRA"]')
            names = part.find_elements(By.XPATH, './/div[@class="Text ietnEf"]')
            ages = part.find_elements(By.XPATH, './/span[@class="Text eMhAJJ"]')
            images = part.find_elements(By.XPATH, './/img[@class="Img cNprQ"]')
            
            size = len(names)
            
            for i in range(size) :
                image = images[i].get_attribute("src")
                players.append({
                    "player_name" : names[i].text,
                    "position" : post.text,
                    "age" : ages[i].text.split()[0],
                    "nationality" : "Morocco",
                    "image" : image
                    })
        except :
            continue
        
    driver.quit()
    
    PlayerDao.clearPlayers()
    
    for player in players :
        try:
            PlayerDao.addPlayer(player)
        except :
            print("problem while inserting player")
    
    return players
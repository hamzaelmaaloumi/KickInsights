import sys
import os
from myapp.dal import PlayerDao, TeamDao, PlaysDao
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
def get_all_players_with_team() :
    rows = PlaysDao.getAllRows()
    players = []
    for row in rows :
        if row.teamID_id != 1 :
            player = PlayerDao.get_player_by_id(row.playerID_id)
            print(player.player_name)
            print(row.teamID_id)
            team = TeamDao.get_team_by_id(row.teamID_id)
            players.append({
                "image" : player.image,
                "name" : player.player_name,
                "age" : player.age,
                "position" : player.position,
                "team" : team.image
            })
    return players
        
    

@staticmethod
def scraping_players() :
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = "C:\\chromedriver-win64\\chromedriver.exe"
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
            images = part.find_elements(By.XPATH, './/img[@class="Img dlClrt"]')
            links = part.find_elements(By.TAG_NAME, 'a')
            
            size = len(names)
            print(size)
            
            for i in range(size) :
                players.append({
                    "player_name" : names[i].text,
                    "position" : post.text,
                    "age" : ages[i].text.split()[0],
                    "nationality" : "Morocco",
                    "image" : images[i].get_attribute("src"),
                    "link" : links[i].get_attribute("href")
                    })
        except :
            continue
            
        
    driver.quit()
    
    PlayerDao.clearPlayers()
    
    for player in players :
        try:
            playerID = PlayerDao.addPlayer(player)
            teamID = TeamDao.get_team_by_name("Maroc").pk
            PlaysDao.addPlaysRow({"teamID": teamID, "playerID": playerID})
        except :
            print("problem while inserting player")
    
    return players
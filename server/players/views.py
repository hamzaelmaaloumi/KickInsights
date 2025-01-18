from django.shortcuts import render
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from django.http import JsonResponse
from .serializers import PlayerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Player

# Create your views here.
@api_view(['GET'])
def scraping_players(request) :
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)

    driver = webdriver.Chrome(service=service)
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
    
    Player.objects.all().delete()
    
    for player in players :
        serializer = PlayerSerializer(data=player)
        if serializer.is_valid() :
            serializer.save()
        if not serializer.is_valid() :
            return Response(serializer.errors, status=400)
    
    return Response(players)
        

@api_view(['GET'])
def getPlayers(request) :
    players = Player.objects.all()
    serializer = PlayerSerializer(players, many=True)
    
    return Response(serializer.data)
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

# Create your views here.

def scraping_team() :
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778'
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)
    
    driver = WebDriver(service=service)
    
    driver.get(path)

    name = driver.find_element(By.XPATH, '//h2[@class="Text jrLdUU"]')
    entraineur = driver.find_element(By.XPATH, '//span[@class="Text zlJiu"]')
    classement = driver.find_element(By.XPATH, '//span[@class="Text ChOXd"]')
    
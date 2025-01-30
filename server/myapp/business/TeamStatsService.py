from myapp.dal import TeamStatsDao, TeamStatsPartsDao
from myapp.entities import TeamStatsPartsModels
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
def get_all_stats() :
    return TeamStatsDao.get_all_stats()

@staticmethod
def get_team_stats_by_team_id(matchID) :
    return TeamStatsDao.get_team_stats_by_match_id(matchID)

@staticmethod
def add_team_stats(teamStats) :
    TeamStatsDao.add_team_stats(teamStats)

@staticmethod
def delete_team_stats(matchID) :
    TeamStatsDao.delete_team_stats(matchID)
    
@staticmethod
def scraping_team_stats() :
    website = "https://www.sofascore.com/fr/equipe/football/morocco/4778#tab:matches"
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--disable-web-security')

    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,600)

    try :
        driver.get(website)
    
        allMatches = driver.find_element(By.XPATH, '//button[@class="Chip hBXmOq"]')
        allMatches.click()
        print("all matches is clicked")
        
        parts = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, '//div[@class="Box iuXXsV"]'))
        )
        
        dateFormat = "%d/%m/%y"
        
        constDate = datetime.strptime('01/01/24',dateFormat)
        
        teamStats = []
        links = []
        print(f"Total parts found: {len(parts)}")
        
        for part in parts :
            try :
                date = part.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
                formatted_date = datetime.strptime(date, dateFormat)
                if formatted_date >= constDate :
                    a_elements = part.find_elements(By.XPATH, './/a[contains(@class, "eRKEkG")]')
                    for a_element in a_elements :
                        links.append(a_element.get_attribute("href"))
                                            
            except :
                continue
        
        for link in links :
            try :
                driver.get(link)
                print(link + " is opened")
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, './/a[@href="#tab:statistics"]'))
                )
                button = driver.find_element(By.XPATH, './/a[@href="#tab:statistics"]')
                driver.execute_script("arguments[0].click();", button)
                print("stats button is clicked")
                time.sleep(2)
                
                boxs = driver.find_elements(By.XPATH, './/div[@class="Box jfMEge"]')
                
                for box in boxs :
                    try :
                        title = box.find_element(By.XPATH, './/span[@class="Text eKGuRn"]')
                        parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                        if title.text == "Aperçu du match" :
                            for part in parts :
                                # possession = models.DecimalField(max_digits=5, decimal_places=2)
                                # grandes_chances = models.PositiveIntegerField(blank=True, null=True)
                                # total_tirs = models.PositiveIntegerField(blank=True, null=True)
                                # arrets_gardien = models.PositiveIntegerField(blank=True, null=True)
                                # corner = models.PositiveIntegerField(blank=True, null=True)
                                # fautes = models.PositiveIntegerField(blank=True, null=True)
                                # passes = models.PositiveIntegerField(blank=True, null=True)
                                # tacles = models.PositiveIntegerField(blank=True, null=True)
                                # coups_francs = models.PositiveIntegerField(blank=True, null=True)
                                # cartons_jaunes = models.PositiveIntegerField(blank=True, null=True)
                                if part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text == "Possession" :
                                    possession = part.find_element(By.XPATH, './/bdi[@class="Box hKQtHc"]').text
                                    print(possession)
                                    
                    except Exception as e :
                        print(f"problem while getting data from boxs : {e}")

            except Exception as e :
                print(f"Error while scraping stats from the link : {e}")
        
    finally :
        driver.quit()
        
        return links


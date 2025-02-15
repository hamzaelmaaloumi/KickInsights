from myapp.dal import TeamDao, PlayerDao, PlaysDao
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from myapp.presentation.serializers import TeamSerializer
from datetime import datetime


@staticmethod
def get_team_by_id(teamID) :
    return TeamDao.get_team_by_id(teamID)

@staticmethod
def get_team_by_name(name):
    return TeamDao.get_team_by_name(name)

@staticmethod
def getAllTeams() :
    return TeamDao.getAllteams()

@staticmethod
def addTeam(team) :
    return TeamDao.add_team(team)

@staticmethod
def deleteTeam(name) :
    return TeamDao.delete_team(name)

@staticmethod
def scraping_teams() :
    website = 'https://www.sofascore.com/fr/equipe/football/morocco/4778#tab:matches'
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)
    
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--disable-web-security')
    
    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,600)
    driver.set_page_load_timeout(30) 
    driver.implicitly_wait(10)  
    
    driver.get(website)
    
    try:
        allMatches = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//button[@class="Chip hBXmOq"]'))
        )
        allMatches.click()
        # print("All matches clicked \n")
        
        parts = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH,'//div[@class="Box iuXXsV"]'))
        )
        
        dateFormat = "%d/%m/%y"
        constDate = datetime.strptime('01/01/24', dateFormat)
        teams = []
        
        matches_links = []
        
        teams_href = []
        
        for part in parts:
            try:
                date = part.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
                formatted_date = datetime.strptime(date, dateFormat)
                if formatted_date >= constDate:
                    matches = part.find_elements(By.XPATH, './/a[@data-testid="event_cell"]')
                    for match in matches :
                        matches_links.append(match.get_attribute("href"))
       
            except (Exception) as e:
                print(f"Error with match link: {e}")
                continue
            
        for link in matches_links:
            try:
                driver.get(link)
                div = WebDriverWait(driver, 20).until(
                    EC.presence_of_element_located((By.XPATH, './/div[@class="Box Flex dZNeJi bnpRyo"]'))
                )
                teams_links = div.find_elements(By.TAG_NAME, 'a')
                for team in teams_links:
                    if team.get_attribute("href") not in teams_href :
                        teams_href.append(team.get_attribute("href"))
                        
            except Exception as e :
                print(f"Error with match link: {e}")
                continue
        
        # print(len(teams_href))
        
        for team_href in teams_href :
            try :
                driver.get(team_href)
                time.sleep(2)
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, './/h2[@class="Text jrLdUU"]'))
                )
                                    
                image = driver.find_element(By.XPATH, './/img[@class="Img dvsmxM"]').get_attribute("src")
                name = driver.find_element(By.XPATH, './/h2[@class="Text jrLdUU"]').text
                entraineur = driver.find_element(By.XPATH, './/span[@class="Text zlJiu"]').text
                try:
                    classement = driver.find_element(By.XPATH, './/span[@class="Text ChOXd"] | .//span[@class="Text gIRyqP"]').text
                except:
                    classement = "N/A"  

                
                elements = driver.find_elements(By.XPATH, './/span[@class="Text cGjIku"]')
                joueurs_total = elements[0].text
                moyenne_age = elements[1].text
                
                teams.append({
                    "image": image,
                    "name": name,
                    "entraineur": entraineur,
                    "classement": classement,
                    "joueurs_total": joueurs_total,
                    "moyenne_age": moyenne_age.split()[0]
                })
            except Exception as e :
                print(f"Error with team href: {e}")
                continue
            
        driver.quit()
        
        for team in teams :
            try :
                if TeamDao.get_team_by_name(team['name']) is None :
                    TeamDao.add_team(team)
            except :
                print("problem while inserting the team")

    except Exception as e:
        print(f"Error: {e}")
        driver.quit()
    
    return teams

@staticmethod
def scraping_players_teams() :
    path = 'E:\\chromedriver-win64\\chromedriver-win64\\chromedriver.exe'
    service = Service(path)
    
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--disable-web-security')
    
    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,600)
    
    links = PlayerDao.get_players_links()
    teams = []
    
    for link in links :
        driver.get(link)
        time.sleep(2)
        
        playerName = driver.find_element(By.XPATH, '//h2[@class="Text cuNqBu"]')
        print(playerName.text)
        teamName = driver.find_element(By.XPATH, '//div[@class="Text leMLNz"]')
        teamImage = driver.find_element(By.XPATH, '//img[@class="Img hDoOBr"]')
        team = {
            "image": teamImage.get_attribute("src"),
            "name": teamName.text,
        }
        teams.append(team)
        teamID = TeamDao.add_team(team)
        playerID = PlayerDao.get_player_by_name(playerName.text).pk
        PlaysDao.addPlaysRow({"teamID": teamID, "playerID": playerID})
        
    return teams
        
    
    
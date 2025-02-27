from myapp.dal import MatcheDao
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from myapp.presentation import serializers
from datetime import datetime
from myapp.entities import LeagueModel, MatcheModel, TeamModel
from myapp.business import TeamStatsService

@staticmethod
def get_matche_by_id(matcheID) :
    return MatcheDao.get_matche_by_id(matcheID)

@staticmethod
def get_matche_by_date(date):
    return MatcheDao.get_matche_by_date(date)

@staticmethod
def getAllMatches() :
    return MatcheDao.getAllMatches()

@staticmethod
def addMatche(matche) :
    return MatcheDao.addMatche(matche)

@staticmethod
def deleteMatche(matcheID) :
    return MatcheDao.deleteMatche(matcheID)

@staticmethod
def scrapMatches() :
    website = "https://www.sofascore.com/fr/equipe/football/morocco/4778#tab:matches"
    path = "C:\\chromedriver-win64\\chromedriver.exe"
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
        matches = []
        date = "01/01/24"
        try :
            latest_date = MatcheDao.get_latest_matche_date()
            if latest_date :
                date = latest_date.strftime(dateFormat)
        except : 
            pass
        
        constDate = datetime.strptime(date,dateFormat)
        
        print(f"Total parts found: {len(parts)}")
        
        for part in parts :
            try :
                date = part.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]').text
                formatted_date = datetime.strptime(date, dateFormat)
                if formatted_date > constDate :
                    leagueName = part.find_element(By.XPATH, './/bdi[@class="Text cUmrHt"]').text
                    partMatches = WebDriverWait(part, 10).until(
                        EC.presence_of_all_elements_located((By.XPATH, './/a[contains(@class, "sc-3f813a14-0 eRKEkG")]'))
                    )
                    print(f"Number of matches in this part: {len(partMatches)}")
                    for match in partMatches :
                        try :
                            scrapedDate = match.find_element(By.XPATH, './/bdi[@class="Text kcRyBI"]')
                            matcheDate = datetime.strptime(scrapedDate.text ,"%d/%m/%y").date()
                            # dbFormattedDate = matcheDate.strftime("%Y-%m-%d")
                            print(matcheDate)
                            
                            scores = match.find_elements(By.XPATH, './/div[@class="Box Flex jTiCHC MkeW sc-efac74ba-2 gxmYGv score-box"]')
                            scoreA = scores[0].text                    
                            scoreB = scores[1].text
                            if scoreA != scoreB :
                                divA = match.find_element(By.XPATH, './/bdi[@class="Text ezSveL"]')
                                divB = match.find_element(By.XPATH, './/bdi[@class="Text kwIkWN"]')
                                if divA.location['y'] < divB.location['y'] :
                                    teamA = divA.text
                                    teamB = divB.text
                                else :
                                    teamA = divB.text
                                    teamB = divA.text
                            else :
                                teams = match.find_elements(By.XPATH, './/bdi[@class="Text kwIkWN"]')
                                teamA = teams[0].text
                                teamB = teams[1].text
            
                            state = match.find_element(By.XPATH, './/div[@class="Text ihwaOf"]').text
                            
                            leagueObj = LeagueModel.League.objects.filter(league_name=leagueName).first()
                            if leagueObj :
                                print("League found")
                                
                            teamAobj = TeamModel.Team.objects.filter(name=teamA).first()
                            if teamAobj :
                                print("TeamA found")
                                
                            teamBobj = TeamModel.Team.objects.filter(name=teamB).first()
                            if teamBobj :
                                print("TeamB found")
                            
                            print(teamA)
                            print(teamB)
                            matche = {
                            "league" : leagueObj.pk,
                            "date"  : matcheDate,
                            "teamA" : teamAobj.pk,
                            "teamB" : teamBobj.pk, 
                            "scoreA" : scoreA,
                            "scoreB" : scoreB,
                            "state" : state
                            }
                            matches.append(matche)
                            MatcheDao.addMatche(matche)
                            TeamStatsService.scraping_team_stats(match.get_attribute("href"))
                        except Exception as e :
                            print(f"Error processing match: {e}")
                            continue
                        
                                            
            except Exception as e :
                print(f"Error processing part: {e}")
                continue
            
    except Exception as e :
        print(f"Error: {e}")
        
    finally :
        driver.quit()
        return matches
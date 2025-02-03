from myapp.dal import TeamStatsDao, TeamStatsPartsDao, MatcheDao, TeamDao
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
    
    sommaire_mapping = {
        "Possession" : "possession",
        "Grandes chances" : "grandes_chances",
        "Total tirs" : "total_tirs",
        "Arrêts du gardien" : "arrets_gardien",
        "Corner" : "corner",
        "Fautes" : "fautes",
        "Passes" : "passes",
        "Tacles" : "tacles",
        "Coups francs" : "coups_francs",
        "Cartons jaunes" : "cartons_jaunes" 
    }
    
    tirs_mapping = {
        "Total des tirs" : "total_tirs" ,
        "Tirs cadrés" : "tirs_cadres" ,
        "Frappe sur le poteau" : "frappe_sur_poteau" ,
        "Tirs non cadrés" : "tirs_non_cadres" ,
        "Tirs bloqués" : "tirs_bloques" ,
        "Tirs dans la surface" : "tirs_dans_surface" ,
        "Tirs en dehors de la surface" : "tirs_hors_surface" 
    }
    
    attaque_mapping = {
        "Grosses occasions réalisées" : "grosses_occasions_realisees" ,
        "Grosses occasions manquées" : "grosses_occasions_manquees" ,
        "Touchers dans la surface de réparation" : "touchers_surface_reparation" ,
        "Tacles reçus dans le dernier tiers" : "tacles_recus_dernier_tiers" ,
        "Hors-jeux" : "hors_jeux"  
        
    }
    
    passes_mapping = {
        "Passes précises" : "passes_precises" ,
        "Touches" : "touches" ,
        "Passes vers le dernier tiers" : "passes_vers_dernier_tiers" ,
        "Dans le dernier tiers" : "dans_le_dernier_tiers" ,
        "Longs ballons" : "longs_ballons" ,
        "Transversales" : "transversales" 
    }
    
    duel_mapping = {
        "Duels" : "duels" ,
        "Perte de balle" : "pertes_balle"  ,
        "Duels au sol" : "duels_sol"  ,
        "Duels aériens" : "duels_aeriens"  , 
        "Dribbles" : "dribbles"  ,
    }
    
    defesne_mapping = {
        "Tacles gagnés" : "tacles_gagnes" ,
        "Tacles totaux" : "tacles_totaux" ,
        "Interceptions" : "interceptions" ,
        "Récupérations" : "recuperations" ,
        "Dégagements" : "degagements" , 
        "Erreurs menant à un but" : "erreurs_menant_a_un_but" ,
    }
    
    gardien_de_but_mapping = {
        "Arrêts du gardien" : "arrets_du_gardien" ,
        "Sorties aériennes" : "sorties_aeriennes" ,
        "Coup de pied de but" : "coup_de_pied_de_but"
    }

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
        sommaire = {}
        attaque = {}
        passes = {}
        duel = {}
        defense = {}
        tirs = {}
        gardien = {}
        
        
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
        
        for link in links:
            sommaire, attaque, passes, duel, defense, tirs, gardien = {}, {}, {}, {}, {}, {}, {}
            try :
                driver.get(link)
                print(link + " is opened")
                dateAndTime = driver.find_element(By.XPATH, '//span[@class="Text hZKSbA"]').text
                date = dateAndTime[:-5]
                matcheDate = datetime.strptime(date ,"%d/%m/%Y").date()
                match = MatcheDao.get_matche_by_date(matcheDate)
                if match is None:
                    print(f"No match found for date: {matcheDate}")
                else:
                    side = "Box hKQtHc"
                    if TeamDao.get_team_by_id(match.teamB_id).name == "Maroc":
                        side = "Box fIiFyn"
                    
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, './/a[@href="#tab:statistics"]'))
                )
                button = driver.find_element(By.XPATH, './/a[@href="#tab:statistics"]')
                driver.execute_script("arguments[0].click();", button)
                print("stats button is clicked")
                time.sleep(2)
                
                boxs = WebDriverWait(driver, 10).until(
                    EC.presence_of_all_elements_located((By.XPATH, './/div[@class="Box jfMEge"]'))
                )
            
                for box in boxs :
                    try :
                        title = box.find_element(By.XPATH, './/span[@class="Text eKGuRn"]')
                        if title.text == "Aperçu du match" :
                            print("Sommaire box is found")
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                                
                                if key == "Possession" :
                                    value = value[:-1]
                                
                                if key in sommaire_mapping :
                                    sommaire[sommaire_mapping[key]] = value
                            teamStats.append({"sommaire" : sommaire})
                            
                        if title.text == "Tirs" :
                            print("Tirs box is found")
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                            
                                if key in tirs_mapping :
                                    tirs[tirs_mapping[key]] = value
                            teamStats.append({"tirs" : tirs})
                                    
                        if title.text == "Attaque" :
                            print("Attaque box is found")
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                            
                                if key in attaque_mapping :
                                    attaque[attaque_mapping[key]] = value
                            teamStats.append({"attaque" : attaque})
                        
                        if title.text == "Passes" :
                            print("Passes box is found")
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            per_parts = box.find_elements(By.XPATH, './/div[@class="Box Flex lirwTl bnpRyo"]')
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                            
                                if key in passes_mapping :
                                    passes[passes_mapping[key]] = value
                                    
                            for per_part in per_parts :
                                key = per_part.find_element(By.XPATH, './/span[@class="Text lluFbU"]').text
                                value = per_part.find_element(By.XPATH, './/div[@class="Text ietnEf"]').text
                                
                                if key in passes_mapping :
                                    passes[passes_mapping[key]] = value   
                            teamStats.append({"passes" : passes})  
                            
                        if title.text == "Duels" :
                            print("Duels box is found")
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            per_parts = box.find_elements(By.XPATH, './/div[@class="Box Flex lirwTl bnpRyo"]')
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text
                                 
                            
                                if key == "Duels" :
                                    value = value[:-1]
                                
                                if key in duel_mapping :
                                    duel[duel_mapping[key]] = value
                                    
                            for per_part in per_parts :
                                key = per_part.find_element(By.XPATH, './/span[@class="Text lluFbU"]').text
                                value = per_part.find_element(By.XPATH, './/div[@class="Text ietnEf"]').text
                                
                                if key in duel_mapping :
                                    duel[duel_mapping[key]] = value
                            teamStats.append({"duel" : duel})
                            
                        if title.text == "Défense" :
                            print("Defense box is found")
                            per_parts = box.find_elements(By.XPATH, './/div[@class="Box Flex lirwTl bnpRyo"]')
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            
                            for per_part in per_parts :
                                key = per_part.find_element(By.XPATH, './/span[@class="Text lluFbU"]').text
                                value = per_part.find_element(By.XPATH, './/div[@class="Text hLrEqo"]').text
                                
                                if key in defesne_mapping :
                                    defense[defesne_mapping[key]] = value[:-1]
                            
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                            
                                if key in defesne_mapping :
                                    defense[defesne_mapping[key]] = value  
                            teamStats.append({"defense" : defense}) 
                            
                        if title.text == "Gardien de but" :
                            print("Gardien box is found")
                            parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                            for part in parts :
                                key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                                value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                            
                                if key in gardien_de_but_mapping :
                                    gardien[gardien_de_but_mapping[key]] = value
                            teamStats.append({"gardien" : gardien})
                                    
                    except Exception as e :
                        print(f"problem in finding the boxs : {e}")
                        
                # matcheID = MatcheDao.get_matche_by_date(matcheDate).id
                # print(matcheID)
                # sommaireID = TeamStatsPartsDao.add_sommaire(sommaire)
                # print(sommaireID)
                # tirsID = TeamStatsPartsDao.add_tirs(tirs)
                # print(tirsID)
                # attaqueID = TeamStatsPartsDao.add_attaque(attaque)
                # print(attaqueID)
                # passesID = TeamStatsPartsDao.add_passes(passes)
                # print(passesID)
                # duelID = TeamStatsPartsDao.add_duels(duel)
                # print(duelID)
                # defenseID = TeamStatsPartsDao.add_defense(defense)
                # print(defenseID)
                # gardienID = TeamStatsPartsDao.add_gardien_de_but(gardien)
                # print(gardienID)
                
                # teamStats.append({
                #     "matcheID" : matcheID,
                #     "sommaire" : sommaireID,
                #     "tirs" : tirsID,
                #     "attaque" : attaqueID,
                #     "passes" : passesID,
                #     "duels" : duelID,
                #     "defense" : defenseID,
                #     "GardienDeBut" : gardienID
                # })

            except Exception as e :
                print(f"problem while extracting data from website : {e}")
            
        
    finally :
        driver.quit()
        
        return teamStats


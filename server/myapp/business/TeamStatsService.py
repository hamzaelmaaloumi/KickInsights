import sys
import os
import django
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')  # Replace with your actual settings path
django.setup()
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
def scraping_team_stats(link) :
    path = "C:\\chromedriver-win64\\chromedriver.exe"
    service = Service(path)

    options = Options()
    options.add_argument("--lang=fr")  #forcing to be french language
    options.add_argument('--headless')
    options.add_argument('--disable-gpu')
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--disable-web-security')

    driver = webdriver.Chrome(service=service, options=options)
    driver.set_window_size(800,600)
    
    sommaire_mapping = {
        "Possession" : "possession",
        "Grandes chances" : "grandes_chances",
        "Total des tirs" : "total_tirs",
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
    
    defense_mapping = {
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

    wait = WebDriverWait(driver, 10)
    teamStats, sommaire, attaque, passes, duel, defense, tirs, gardien = None, {}, {}, {}, {}, {}, {}, {}
    
    try :
        driver.get(link)
        time.sleep(2)

        print(link + " is opened")
        time.sleep(2)
        dateAndTime = wait.until(
            EC.presence_of_element_located((By.XPATH, './/span[@class="Text hZKSbA"]'))
        ).text
        date = dateAndTime[:-5]
        matcheDate = datetime.strptime(date, "%d/%m/%Y").date()
        if matcheDate:
            match = MatcheDao.get_matche_by_date(matcheDate)
            if match.teamB:
                    print(f"Match found for {matcheDate}: Team B is {match.teamB.name}")
                    team_b = TeamDao.get_team_by_id(match.teamB.pk)
                    if team_b:
                        if team_b.name == "Maroc":
                            side, per_side, def_side = "Box fIiFyn", "Text ietnEf", 1
                        else:
                            side, per_side, def_side = "Box hKQtHc", "Text cRLeMh", 0
                        
                        print(f"Side set to {side} for team {team_b.name}")
                    else:
                        print(f"No team found for ID: {match.teamB.pk}")
                        side = None
            else:
                print("match.teamB is None, skipping team lookup")
                side = None
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, './/a[@href="#tab:statistics"]'))
        )
        button = driver.find_element(By.XPATH, './/a[@href="#tab:statistics"]')
        driver.execute_script("arguments[0].click();", button)
        print("stats button is clicked")
        time.sleep(2)
        
        layer = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//div[@class="Box Flex VhXzF kGBmhP"]'))
        )
        
        boxs = layer.find_elements(By.XPATH, './div')
    
        for box in boxs :
            try :
                title = box.find_element(By.XPATH, './div[1]')
                if title.text == "Aperçu du match" :
                    print("Sommaire box is found")
                    parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                    for part in parts :
                        key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                        value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                        
                        if key == "Possession" :
                            value = value
                        
                        if key in sommaire_mapping :
                            sommaire[sommaire_mapping[key]] = value
                    
                if title.text == "Tirs" :
                    print("Tirs box is found")
                    parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                    for part in parts :
                        key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                        value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                    
                        if key in tirs_mapping :
                            tirs[tirs_mapping[key]] = value
                            
                if title.text == "Attaque" :
                    print("Attaque box is found")
                    parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                    for part in parts :
                        key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                        value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                    
                        if key in attaque_mapping :
                            attaque[attaque_mapping[key]] = value
                
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
                        
                        if per_side == "Text ietnEf" :
                            values = per_part.find_elements(By.XPATH, f'.//span[@class="{per_side}"]')
                            if key in passes_mapping :
                                passes[passes_mapping[key]] = values[2].text  
                            continue
                        
                        value = per_part.find_element(By.XPATH, f'.//span[@class="{per_side}"]').text
                        
                        if key in passes_mapping :
                            passes[passes_mapping[key]] = value     
                    
                if title.text == "Duels" :
                    print("Duels box is found")
                    parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                    per_parts = box.find_elements(By.XPATH, './/div[@class="Box Flex lirwTl bnpRyo"]')
                    for part in parts :
                        key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                        value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text
                        
                        if key in duel_mapping :
                            duel[duel_mapping[key]] = value
                            
                    for per_part in per_parts :
                        key = per_part.find_element(By.XPATH, './/span[@class="Text lluFbU"]').text
                        
                        if per_side == "Text ietnEf" :
                            values = per_part.find_elements(By.XPATH, f'.//span[@class="{per_side}"]')
                            if key in duel_mapping :
                                duel[duel_mapping[key]] = values[-1].text  
                            continue
                        
                        value = per_part.find_element(By.XPATH, f'.//span[@class="{per_side}"]').text
                        if key in duel_mapping :
                            duel[duel_mapping[key]] = value
                
                    
                if title.text == "Défense" :
                    print("Defense box is found")
                    per_parts = box.find_elements(By.XPATH, './/div[@class="Box Flex dXtfMP bnpRyo"]')
                    parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                    
                    for per_part in per_parts :
                        key = per_part.find_element(By.XPATH, './/span[@class="Text lluFbU"]').text
                        values = per_part.find_elements(By.XPATH, './/span[@class="Text hLrEqo"]')
                        if values :
                            final_value = values[def_side].text
                        else :
                            final_value = None
                        
                        if key in defense_mapping :
                            defense[defense_mapping[key]] = final_value
                    
                    for part in parts :
                        key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                        value_elements = part.find_elements(By.XPATH, f'.//bdi[@class="{side}"]')
                        if value_elements :
                            value = value_elements[0].text
                        else :
                            value = None
                            
                        if key in defense_mapping :
                            defense[defense_mapping[key]] = value   
                    
                if title.text == "Gardien de but" :
                    print("Gardien box is found")
                    parts = box.find_elements(By.XPATH, './/div[@class="Box Flex heNsMA bnpRyo"]')
                    for part in parts :
                        key = part.find_element(By.XPATH, './/bdi[@class="Box fUNIGw"]').text
                        value = part.find_element(By.XPATH, f'.//bdi[@class="{side}"]').text 
                    
                        if key in gardien_de_but_mapping :
                            gardien[gardien_de_but_mapping[key]] = value
                            
            except Exception as e :
                print(f"problem in finding the boxs : {e}")
                
        matcheID = MatcheDao.get_matche_by_date(matcheDate).id
        print(f"this is the match id : {matcheID}")
        sommaireID = TeamStatsPartsDao.add_sommaire(sommaire)
        print(f"summary : {sommaire}")
        tirsID = TeamStatsPartsDao.add_tirs(tirs)
        attaqueID = TeamStatsPartsDao.add_attaque(attaque)
        passesID = TeamStatsPartsDao.add_passes(passes)
        duelID = TeamStatsPartsDao.add_duels(duel)
        defenseID = TeamStatsPartsDao.add_defense(defense)
        gardienID = TeamStatsPartsDao.add_gardien_de_but(gardien)
        
        
        teamStats = {
            "matcheID" : matcheID,
            "sommaire" : sommaireID,
            "tirs" : tirsID,
            "attaque" : attaqueID,
            "passes" : passesID,
            "duels" : duelID,
            "defense" : defenseID,
            "GardienDeBut" : gardienID
        }
        TeamStatsDao.add_team_stats(teamStats)
            
    except Exception as e :
            print(f"problem while extracting data from website : {e}")
        
    finally :
        driver.quit()
        return teamStats

# strptime() – Convert String to Datetime
# strftime() – Convert Datetime to String


#scraping_team_stats('https://www.sofascore.com/fr/football/match/lesotho-morocco/DVbsIkd#id:12526724,tab:statistics')
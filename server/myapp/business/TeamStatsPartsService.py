from myapp.dal import TeamStatsPartsDao
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
from myapp.presentation import serializers

@staticmethod
def get_attaque_by_id(attaqueID) :
    return TeamStatsPartsDao.get_attaque_by_id(attaqueID)

@staticmethod
def get_defense_by_id(defenseID) :
    return TeamStatsPartsDao.get_defense_by_id(defenseID)

@staticmethod
def get_duel_by_id(duelID) :
    return TeamStatsPartsDao.get_duel_by_id(duelID)

@staticmethod
def get_passes_by_id(passesID) :
    return TeamStatsPartsDao.get_passes_by_id(passesID)

@staticmethod
def get_tirs_by_id(tirsID) :
    return TeamStatsPartsDao.get_tirs_by_id(tirsID)

@staticmethod
def get_sommaire_by_id(sommaireID) :
    try:
        return TeamStatsPartsDao.get_sommaire_by_id(sommaireID)
    except :
        print(f"service says : {Exception}")

@staticmethod
def get_gardien_de_but_by_id(goalkeepingID) :
    return TeamStatsPartsDao.get_gardien_de_but_by_id(goalkeepingID)

@staticmethod
def add_attaque(attaque) :
    return TeamStatsPartsDao.add_attaque(attaque)

@staticmethod
def add_sommaire(sommaire) :
    return TeamStatsPartsDao.add_sommaire(sommaire)

@staticmethod
def add_passes(passes) :
    return TeamStatsPartsDao.add_passes(passes)

@staticmethod
def add_tirs(tirs) :
    return TeamStatsPartsDao.add_tirs(tirs)

@staticmethod
def add_defense(defense) :
    return TeamStatsPartsDao.add_defense(defense)

@staticmethod
def add_duels(duels) :
    return TeamStatsPartsDao.add_duels(duels)

@staticmethod
def add_gardien_de_but(gardien_de_but) :
    return TeamStatsPartsDao.add_gardien_de_but(gardien_de_but)
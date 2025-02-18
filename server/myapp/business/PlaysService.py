from myapp.entities import PlaysModel
from myapp.presentation.serializers import PlaysSerializer
from myapp.dal import PlaysDao

@staticmethod
def getAllPlayers() :
    return PlaysDao.getAllRows()

@staticmethod
def get_players_by_id_team(teamId) :
    return PlaysDao.get_players_by_id_team(teamId)

@staticmethod
def get_teams_by_id_player(playerId) :
    return PlaysDao.get_teams_by_id_player(playerId)

@staticmethod
def addPlaysRow(data) :
    return PlaysDao.addPlaysRow(data)
    
@staticmethod
def clearPlayers() :
    return PlaysDao.clearPlayers()
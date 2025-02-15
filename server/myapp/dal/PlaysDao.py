from myapp.entities import PlaysModel
from myapp.presentation.serializers import PlaysSerializer

@staticmethod
def getAllRows() :
    return PlaysModel.Plays.objects.all()

@staticmethod
def get_players_by_id_team(teamId) :
    return PlaysModel.Plays.objects.filter(teamId=teamId)

@staticmethod
def get_teams_by_id_player(playerId) :
    return PlaysModel.Plays.objects.filter(playerId=playerId)

@staticmethod
def addPlaysRow(row) :
    try :
        serializer = PlaysSerializer(data=row)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting player")
        
@staticmethod
def clearPlayers() :
    try :
        PlaysModel.Player.objects.all().delete()
    except Exception as e :
        print("problem while deleting the players")
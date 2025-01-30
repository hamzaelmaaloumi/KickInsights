from myapp.entities import PlayerModel
from myapp.presentation.serializers import PlayerSerializer

@staticmethod
def getAllPlayers() :
    return PlayerModel.Player.objects.all()

@staticmethod
def get_player_by_name(name) :
    return PlayerModel.Player.objects.filter(player_name=name).first()

@staticmethod
def get_player_by_id(playerId) :
    return PlayerModel.Player.objects.filter(id = playerId).first()

@staticmethod
def addPlayer(player) :
    try :
        serializer = PlayerSerializer(data=player)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting player")
        
@staticmethod
def deletePlayer(name) :
    try :
        player = get_player_by_name(name)
        player.delete()
    except Exception as e :
        print("error while deleting player")
        
@staticmethod
def clearPlayers() :
    try :
        PlayerModel.Player.objects.all().delete()
    except Exception as e :
        print("problem while deleting the players")
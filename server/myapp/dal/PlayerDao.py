from django.db.models import Count
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
            obj = serializer.save()
            return obj.id
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
        
@staticmethod
def get_players_links() :
    return PlayerModel.Player.objects.values_list('link', flat=True)

@staticmethod
def get_positions() :
    return PlayerModel.Player.objects.values('position').annotate(count = Count('position'))
from myapp.entities import PlayerStatsModel
from myapp.presentation.serializers import PlayerStatsSerializer, GoalkeeperStatsSerializer

@staticmethod
def get_all_player_stats() :
    return PlayerStatsModel.PlayerStats.objects.all()

@staticmethod
def get_all_goalkeeper_stats() :
    return PlayerStatsModel.GoalkeeperStats.objects.all()

@staticmethod
def get_player_stats_by_match_id(matchID) :
    return PlayerStatsModel.PlayerStats.objects.filter(match__id = matchID)

@staticmethod
def add_player_stats(PlayerStats) :
    try :
        serializer =  PlayerStatsSerializer(data=PlayerStats)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting player stats")

@staticmethod
def add_goalkeeper_stats(PlayerStats) :
    try :
        serializer =  GoalkeeperStatsSerializer(data=PlayerStats)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting goalkeeper stats")
    
@staticmethod
def delete_player_stats(matchID) :
    try :
        stats = PlayerStatsModel.PlayerStats.objects.filter(match__id = matchID)
        stats.delete()
    except Exception as e :
        print("problem while deleting the player stats")

@staticmethod
def clear_players():
    try:
        PlayerStatsModel.PlayerStats.objects.all().delete()
    except:
        print("problem while deleting the palyers' stats")

@staticmethod
def clear_goalkeepers():
    try:
        PlayerStatsModel.GoalkeeperStats.objects.all().delete()
    except:
        print("problem while deleting the goalkeepers' stats")
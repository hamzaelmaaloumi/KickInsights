from myapp.entities import PlayerStatsModel
from myapp.presentation.serializers import PlayerStatsSerializer

@staticmethod
def get_all_stats() :
    return PlayerStatsModel.PlayerStats.objects.all()

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
def delete_player_stats(matchID) :
    try :
        stats = PlayerStatsModel.PlayerStats.objects.filter(match__id = matchID)
        stats.delete()
    except Exception as e :
        print("problem while deleting the player stats")
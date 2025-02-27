from myapp.entities import PlayerStatsModel
from myapp.presentation.serializers import PlayerStatsSerializer, PlayerStatsWithTeamSerializer

# with morocco

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
        
        
# with teams

@staticmethod
def get_all_players_stats_for_teams() :
    return PlayerStatsModel.PlayerStatsWithTeam.objects.all()

@staticmethod
def get_player_stats_for_team_by_id(playerID) :
    return PlayerStatsModel.PlayerStatsWithTeam.objects.filter(player_id = playerID)
        
@staticmethod
def add_player_stats_with_team(player_stats) :
    try :
        serializer =  PlayerStatsWithTeamSerializer(data=player_stats)
        if serializer.is_valid() :
            serializer.save()
        else :
            print("serializer is not valid")
    except Exception as e :
        print("error while inserting player stats")
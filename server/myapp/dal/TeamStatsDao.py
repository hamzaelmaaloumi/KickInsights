from myapp.entities import TeamStatsModel
from myapp.presentation.serializers import TeamStatsSerializer

@staticmethod
def get_all_stats() :
    return TeamStatsModel.TeamStats.objects.all()

@staticmethod
def get_team_stats_by_match_id(matchID) :
    return TeamStatsModel.TeamStats.objects.filter(id = matchID)

@staticmethod
def add_team_stats(teamStats) :
    try :
        serializer =  TeamStatsSerializer(data=teamStats)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting team stats")
    
@staticmethod
def delete_team_stats(matchID) :
    try :
        stats = TeamStatsModel.TeamStats.objects.filter(matcheID = matchID)
        stats.delete()
    except Exception as e :
        print("problem while deleting the team stats")
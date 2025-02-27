from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import TeamStatsService
from .serializers import TeamStatsSerializer
from rest_framework import status

@api_view(['GET'])
def scraping_team_Stats(request) :
    teamStats = TeamStatsService.scraping_team_stats()
    return Response(teamStats)


@api_view(['GET'])
def getTeamStatsByMatchId(request, match_id):
    team_stat = TeamStatsService.get_team_stats_by_match_id(match_id)
    serializer = TeamStatsSerializer(team_stat, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import TeamStatsService
from .serializers import TeamStatsSerializer

@api_view(['GET'])
def scraping_team_Stats(request) :
    teamStats = TeamStatsService.scraping_team_stats()
    return Response(teamStats)


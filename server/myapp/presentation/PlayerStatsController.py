from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import PlayerStatsService
from .serializers import PlayerStatsSerializer


@api_view(['GET'])
def scraping_players_stats_with_teams(request) :
    stats = PlayerStatsService.scrap_players_stats_with_teams()
    return Response(stats)


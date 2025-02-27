from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import PlayerStatsService
from .serializers import PlayerStatsSerializer, GoalkeeperStatsSerializer
from rest_framework import status

@api_view(['GET'])
def scraping_player_Stats(request) :
    try: 
        PlayerStatsService.scrap_players_stats()
        return Response({'success':'Player stats scraped successfully!'})
    except:
        return Response(
            {'error': 'a temporary error happened, please try again later, make sure your connection is stable'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
def scraping_goalkeeper_Stats(request) :
    try:
        PlayerStatsService.scrap_goalkeeper_stats()
        return Response({'success':'Goalkeeper stats scraped successfully!'})
    except:
        return Response(
            {'error': 'a temporary error happened, please try again later, make sure your connection is stable'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
def get_all_player_stats(request):
    try:
        playerstats = PlayerStatsService.get_all_player_stats()
        serializer = PlayerStatsSerializer(playerstats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_all_goalkeeper_stats(request):
    try:
        goalkeeperstats = PlayerStatsService.get_all_goalkeeper_stats()
        serializer = PlayerStatsSerializer(goalkeeperstats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "an error happened"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import LeagueService
from .serializers import LeagueSerializer

@api_view(['GET'])
def scraping_leagues(request) :
    leagues1 = LeagueService.scraping_leagues()
    leagues2 = LeagueService.scrap_players_leagues()
    leagues = leagues1 + leagues2
    return Response(leagues)

@api_view(['GET'])
def getAllLeagues(request) :
    players = LeagueService.getAllLeagues()
    serializer = LeagueSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addLeague(request) :
    try : 
        league = LeagueService.addLeague(request.data)
        return Response(league)
    except :
        print("problem while adding league from api")
        
@api_view(['GET'])
def scraping_players_leagues(request) :
    leagues = LeagueService.scrap_players_leagues()
    return Response(leagues)

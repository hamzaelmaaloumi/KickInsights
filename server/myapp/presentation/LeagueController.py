from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import LeagueService
from .serializers import LeagueSerializer

@api_view(['GET'])
def scraping_leagues(request) :
    try:
        leagues1 = LeagueService.scraping_leagues()
        leagues2 = LeagueService.scrap_players_leagues()
        leagues = leagues1 + leagues2
        return Response(leagues)
    except Exception as e:
        return Response({'error':f"{e}"})

@api_view(['GET'])
def getAllLeagues(request) :
    leagues = LeagueService.getAllLeagues()
    serializer = LeagueSerializer(leagues, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getLeagueById(request, league_id):
    league = LeagueService.get_league_by_id(league_id)
    serializer = LeagueSerializer(league, many=False)
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

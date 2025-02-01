from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import LeagueService
from .serializers import LeagueSerializer

@api_view(['GET'])
def scraping_leagues(request) :
    leagues = LeagueService.scraping_leagues()
    return Response(leagues)

@api_view(['GET'])
def getAllLeagues(request) :
    players = LeagueService.getAllLeagues()
    serializer = LeagueSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addLeague(request) :
    serializer = LeagueSerializer(data=request.data)
    if not serializer.is_valid() :
        return Response(serializer.errors, status=400)
    serializer.save()
    return Response(serializer.data)


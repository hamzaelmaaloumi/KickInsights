from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import PlayerService
from .serializers import PlayerSerializer

@api_view(['GET'])
def scraping_players(request) :
    players = PlayerService.scraping_players()
    return Response(players)

@api_view(['GET'])
def getAllplayers(request) :
    players = PlayerService.getAllPlayers()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addPlayer(request) :
    serializer = PlayerSerializer(data=request.data)
    if not serializer.is_valid() :
        return Response(serializer.errors, status=400)
    serializer.save()
    return Response(serializer.data)


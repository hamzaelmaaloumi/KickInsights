from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import PlayerService
from .serializers import PlayerSerializer

@api_view(['GET'])
def scraping_players(request) :
    try:
        players = PlayerService.scraping_players()
        return Response(players)
    except Exception as e:
        return Response({'error':f"{e}"})

@api_view(['GET'])
def getAllplayers(request) :
    players = PlayerService.getAllPlayers()
    serializer = PlayerSerializer(players, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_players_with_team(request) :
    return Response(PlayerService.get_all_players_with_team())

@api_view(['POST'])
def addPlayer(request) :
    try :
        player = PlayerService.addPlayer(request.data)
        return Response(player)
    except :
        print("problem while adding player from api")
        
@api_view(['GET'])
def get_positions(request) :
    return Response(PlayerService.get_positions())
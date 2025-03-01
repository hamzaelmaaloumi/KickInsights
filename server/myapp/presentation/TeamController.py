from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import TeamService
from .serializers import TeamSerializer

@api_view(['GET'])
def scraping_teams(request) :
    teams = TeamService.scraping_teams()
    return Response(teams)

@api_view(['GET'])
def scraping_players_teams(request) :
    teams = TeamService.scraping_players_teams()
    return Response(teams)

@api_view(['GET'])
def getAllteams(request) :
    teams = TeamService.getAllTeams()
    serializer = TeamSerializer(teams, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTeamById(request, team_id):
    team = TeamService.get_team_by_id(team_id)
    serializer = TeamSerializer(team, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def get_team_by_name(request) :
    team_name = request.data.get("name")
    team = TeamService.get_team_by_name(team_name)
    if team:
        serializer = TeamSerializer(team) 
        return Response(serializer.data)

@api_view(['POST'])
def addTeam(request) :
    try :
        team = TeamService.addTeam(data=request.data)
        return Response(team)
    except : 
        print("problem while inserting the team")

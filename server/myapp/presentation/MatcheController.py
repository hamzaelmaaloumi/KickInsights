from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import MatcheService
from .serializers import MatcheSerializer
from rest_framework import status


@api_view(['GET'])
def scraping_matches(request) :
    matches = MatcheService.scrapMatches()
    return Response(matches)

@api_view(['GET'])
def get_all_Matches(request) :
    matches = MatcheService.getAllMatches()
    serializer = MatcheSerializer(matches, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMatchById(request, match_id):
    match = MatcheService.get_matche_by_id(match_id)
    serializer = MatcheSerializer(match, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def getAllLeagues(request) :
    matches = MatcheService.getAllMatches()
    serializer = MatcheSerializer(matches, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addMatch(request) :
    try :
        match = MatcheService.addMatche(request.data)
        return Response(match)
    except : 
        print("problem while adding match from api")
    


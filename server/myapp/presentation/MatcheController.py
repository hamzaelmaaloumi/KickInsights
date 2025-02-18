from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import MatcheService
from .serializers import MatcheSerializer

@api_view(['GET'])
def scraping_matches(request) :
    matches = MatcheService.scrapMatches()
    return Response(matches)

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
    


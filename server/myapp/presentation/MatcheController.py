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
    serializer = MatcheSerializer(data=request.data)
    if not serializer.is_valid() :
        return Response(serializer.errors, status=400)
    serializer.save()
    return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import OpponentService
from myapp.serializers import OpponentSerializer



@api_view(['GET'])
def scraping_opponents(request):
    try:
        OpponentService.scrap_Opponent_stats(2)
        return Response({'success':'serialization worked'})
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})


@api_view(['GET'])
def get_all_opponents(request):
    try:
        opponents = OpponentService.getAllOponents()
        serializer = OpponentSerializer.OpponentSerializer(opponents, many=True)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response({'error': f'an error happend : : : : {e}'})

    

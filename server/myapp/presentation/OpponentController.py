from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import OpponentService
from myapp.serializers import OpponentSerializer



@api_view(['GET'])
def scraping_opponents(request):
    try:
        OpponentService.scrap_Opponent_stats(4)
        return Response({'success':'true'})
    except Exception as e:
        return Response({'success': 'false', 'error': f'{e}'})
    
@api_view(['GET'])
def get_all_opponents(request):
    try:
        opponents = OpponentService.getAllOponents()
        serializer = OpponentSerializer.OpponentSerializer(opponents, many=True)
        return Response(serializer.data)
    except Exception as e:
        print(e)
        return Response({'error': f'an error happend : : : : {e}'})
@api_view(['GET'])
def get_Opponent_by_id(request, id):
    try: 
        Opponent = OpponentService.getOpponentById(id)
        serializer = OpponentSerializer.OpponentSerializer(Opponent, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})




@api_view(['GET'])
def get_summary(request):
    try:
        summary = OpponentService.getSummary()
        serializer = OpponentSerializer.SummarySerializer(summary, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    
@api_view(['GET'])
def get_summary_by_id(request, id):
    try: 
        summary = OpponentService.getSummaryById(id)
        serializer = OpponentSerializer.SummarySerializer(summary, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    


@api_view(['GET'])
def get_Defending(request):
    try:
        Defending = OpponentService.getDefending()
        serializer = OpponentSerializer.DefendingSerializer(Defending, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    
@api_view(['GET'])
def get_defending_by_id(request, id):
    try: 
        Defending = OpponentService.getDefendingById(id)
        serializer = OpponentSerializer.DefendingSerializer(Defending, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})


@api_view(['GET'])
def get_Other(request):
    try:
        Other = OpponentService.getOther()
        serializer = OpponentSerializer.OtherSerializer(Other, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    
@api_view(['GET'])
def get_other_by_id(request, id):
    try: 
        Other = OpponentService.getOtherById(id)
        serializer = OpponentSerializer.OtherSerializer(Other, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})


@api_view(['GET'])
def get_Attacking(request):
    try:
        Attacking = OpponentService.getAttacking()
        serializer = OpponentSerializer.AttackingSerializer(Attacking, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    
@api_view(['GET'])
def get_attacking_by_id(request, id):
    try: 
        Attacking = OpponentService.getAttackingById(id)
        serializer = OpponentSerializer.AttackingSerializer(Attacking, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})


@api_view(['GET'])
def get_Passing(request):
    try:
        Passing = OpponentService.getPassing()
        serializer = OpponentSerializer.PassingSerializer(Passing, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    
@api_view(['GET'])
def get_passing_by_id(request, id):
    try: 
        Passing = OpponentService.getPassingById(id)
        serializer = OpponentSerializer.PassingSerializer(Passing, many=False)
        return Response(serializer.data)
    except Exception as e:
        return Response({'error': f'an error happend : : : : {e}'})
    
    

from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.business import TeamStatsPartsService
from .serializers import SommaireSerializer, AttaqueSerializer, TirsSerializer, PassesSerializer, DuelSerializer, DefenseSerializer, GardienDeButSerializer
from rest_framework import status


@api_view(['GET'])
def getSummaryById(request, summary_id):
    try:
        Summary = TeamStatsPartsService.get_sommaire_by_id(summary_id)
        serializer = SommaireSerializer(Summary, many=False)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    except :
        print(f"controller says : {Exception}")

@api_view(['GET'])
def getAttackById(request, attack_id):
    attack = TeamStatsPartsService.get_attaque_by_id(attack_id)
    serializer = AttaqueSerializer(attack, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getShootById(request, shoot_id):
    Shoot = TeamStatsPartsService.get_tirs_by_id(shoot_id)
    serializer = TirsSerializer(Shoot, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getPassesById(request, passes_id):
    Passes = TeamStatsPartsService.get_passes_by_id(passes_id)
    serializer = PassesSerializer(Passes, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getDualById(request, dual_id):
    Dual = TeamStatsPartsService.get_duel_by_id(dual_id)
    serializer = DuelSerializer(Dual, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getDefenseById(request, defense_id):
    Defensek = TeamStatsPartsService.get_defense_by_id(defense_id)
    serializer = DefenseSerializer(Defensek, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getGoalkeeperById(request, goalkeeper_id):
    Goalkeeper = TeamStatsPartsService.get_gardien_de_but_by_id(goalkeeper_id)
    serializer = GardienDeButSerializer(Goalkeeper, many=False)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


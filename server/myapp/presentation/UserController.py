from rest_framework.decorators import api_view
from myapp.business import UserService
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def getAllUsers(request) :
    users = UserService.getAllUsers()
    return Response(users)


@api_view(['POST'])
def addUser(request) :
    return UserService.addUser(request.data)


@api_view(['POST'])
def loginUser(request) :
    return UserService.loginUser(request, request.data)
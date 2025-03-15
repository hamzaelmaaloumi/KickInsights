from rest_framework.decorators import api_view
from myapp.business import UserService
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def getAllUsers(request) :
    users = UserService.getAllUsers()
    return Response(users)

@api_view(['GET'])
def getManagers(request) :
    return Response(UserService.getManagers())

@api_view(['POST'])
def addUser(request) :
    return UserService.addUser(request.data)


@api_view(['POST'])
def loginUser(request) :
    return UserService.loginUser(request, request.data)

@api_view(['GET'])
def user(request) :
    return Response(UserService.user(request))

@api_view(['POST'])
def deleteUser(request) :
    return UserService.deleteUser(request.data.get('username'))

@api_view(['POST'])
def updateUser(request) :
    old_username = request.data.get('old_username')
    if not old_username:
        return Response({'error': 'Old username is required'}, status=status.HTTP_400_BAD_REQUEST)
    data = request.data.copy()
    data.pop('old_username', None)
    return UserService.updateUser(old_username, data)

@api_view(['GET'])
def get_number_of_managers(request):
    return Response(UserService.get_number_of_managers())

@api_view(['GET'])
def get_number_of_users(request):
    return Response(UserService.get_number_of_users())
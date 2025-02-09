from myapp.serializers import UserSerializer
from myapp.dal import UserDao
from rest_framework.response import Response
from rest_framework import status


@staticmethod
def getAllUsers() : 
    users = UserDao.getAllUsers()
    serializer = UserSerializer.UserSerializer(users, many=True)
    return serializer.data


@staticmethod
def addUser(data):
    username = data.get('username')
    if UserDao.getUserByUsername(username).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    is_manager = data.get('is_manager', False)
    user_serializer = UserSerializer.UserSerializer(data=data)
    if user_serializer.is_valid():
        validated_user_data = user_serializer.validated_data #extract validated data

        user = UserDao.addUser(validated_user_data)

        if is_manager:
            manager_data = {
                'user': user.id,  # Pass user instance
                'phone_number': data.get('phone_number'),
                'birthday': data.get('birthday'),
                'nationality': data.get('nationality'),
                'profile_picture': data.get('profile_picture'),
            }
            
            manager_serializer = UserSerializer.ProfileManagerSerializer(data=manager_data)
            if manager_serializer.is_valid():
                validated_manager_data = manager_serializer.validated_data

                UserDao.addUserManager(validated_manager_data)
            else:
                UserDao.deleteUser(user)
                return Response(manager_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@staticmethod
def loginUser(request, data):
    username = data.get('username')
    password = data.get('password')
    user = UserDao.getUser(username, password)
    if user is not None:
        profile_picture = None
        if user.is_manager and hasattr(user, 'manager_profile'):
            if user.manager_profile.profile_picture:
                profile_picture = request.build_absolute_uri(user.manager_profile.profile_picture.url)
            #build abasolute path for the url of the image

        return Response(
            {
            'authenticated': True, 
            'user_id': user.id,
            'username': user.username,
            'is_manager': user.is_manager,
            'profile_picture': profile_picture,
            },
            status=status.HTTP_200_OK)
    else:
        return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
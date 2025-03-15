from myapp.serializers import UserSerializer
from myapp.dal import UserDao, ActivityDao
from rest_framework.response import Response
from rest_framework import status
import jwt, datetime
from rest_framework.exceptions import AuthenticationFailed
from myapp.entities.UserModel import User

@staticmethod
def getAllUsers() : 
    users = UserDao.getAllUsers()
    serializer = UserSerializer.UserSerializer(users, many=True)
    return serializer.data

@staticmethod
def deleteUser(user_name) :
    user = UserDao.getUserByUsername(user_name)
    if user :
        UserDao.deleteUser(user)
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


@staticmethod
def addUser(data):
    activity = {}
    username = data.get('username')
    if UserDao.getUserByUsername(username).exists():
        return Response({'error': 'User already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    role = data.get('role')
    user_serializer = UserSerializer.UserSerializer(data=data)
    if user_serializer.is_valid():
        validated_user_data = user_serializer.validated_data #extract validated data

        user = UserDao.addUser(validated_user_data)
        
        activity = {
            "user" : user,
            "action" : 'user_signup',
            "description" : f"L'utilisateur {user.username} s'est inscrit."
        }

        if role == 'manager':
            manager_data = {
                'user': user.id,  # Pass user instance
                'phone_number': data.get('phone_number'),
                'birthday': data.get('birthday'),
                'nationality': data.get('nationality'),
                'profile_picture': data.get('profile_picture'),
            }
            
            activity = {
                "user" : UserDao.get_admin().pk,
                "action" : 'manager_added',
                "description" : f"Le gestionnaire {user.username} a été ajouté."
            }
            
            obj = ActivityDao.add_activitie(activity)
            print(obj)
            
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
def updateUser(old_username, data) :
    if UserDao.updateUser(old_username, data) :
        return Response({'message': 'User updated successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@staticmethod
def loginUser(request, data):
    username = data.get('username')
    password = data.get('password')
    user = UserDao.getUser(username, password)
    if user is not None:
        profile_picture = None
        if user.role == "manager" and hasattr(user, 'manager_profile'):
            if user.manager_profile.profile_picture:
                profile_picture = request.build_absolute_uri(user.manager_profile.profile_picture.url)
            
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(minutes=120)            
            
        payload = {
            'id': user.id,
            'exp': expiration_time,
            'iat': datetime.datetime.utcnow()
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response(
            {
                'authenticated': True, 
                'user_id': user.id,
                'username': user.username,
                'role': user.role,
                'profile_picture': profile_picture,
                'jwt': token
            },
            status=status.HTTP_200_OK
        )
        
        response.set_cookie(
            key='jwt', 
            value=token, 
            httponly=True, 
            secure=True,  # Set to True for HTTPS
            samesite='None',  # Required for cross-site cookies
            max_age=7200  # Optional: Set cookie expiration time in seconds
        )
        return response
    else:
        return Response({'authenticated': False}, status=status.HTTP_401_UNAUTHORIZED)
      
def user(request) :
    token = request.COOKIES.get('jwt')
    
    if not token :
        raise AuthenticationFailed('Unauthenticated')
    
    try :
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError :
        raise AuthenticationFailed('Unauthenticated')
    
    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)
    
    return serializer.data

def logout(request) :
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message':'sucess'
    }
    return response

def getManagers() :
    return UserDao.getAllManagers()

@staticmethod
def get_number_of_managers():
    return UserDao.get_number_of_managers()

@staticmethod
def get_number_of_users():
    return UserDao.get_number_of_users()
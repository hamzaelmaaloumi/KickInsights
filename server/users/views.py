from django.http.response import JsonResponse
from rest_framework import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User

import jwt, datetime
# Create your views here.

@api_view (['POST'])
def register(request) :
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid() :
        serializer.save()
    if not serializer.is_valid() :
        return Response(serializer.errors, status=400)
    return Response(serializer.data)

@api_view (['POST'])
def login(request) :
    email = request.data.get('email')
    password = request.data.get('password')
    if not email or not password:
        return JsonResponse({'error': 'Email and password are required'}, status=400)
    
    user = User.objects.filter(email=email).first()
    
    if user is None :
        raise AuthenticationFailed('User not found')
    
    if not user.check_password(password) :
        raise AuthenticationFailed('Incorrect password')
    
    payload = {
        'id' : user.id ,
        'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat' : datetime.datetime.utcnow()
    }
    
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    
    response = Response()
    response.set_cookie(key='jwt', value=token, httponly=True)
    response.data = {
        'jwt' : token    
    }
    
    return response
    
@api_view (['GET'])   
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
    
    return Response(serializer.data)

@api_view (['POST'])
def logout(request) :
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message':'sucess'
    }
    return response
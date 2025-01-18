from rest_framework import serializers
from .models import User

class UserSerializer (serializers.ModelSerializer):
    class Meta :
        model = User
        fields = ['id' ,'is_superuser','first_name' ,'last_name', 'nationality' , 'email', 'password', 'birthday', 'image', ]
        extra_kwargs = {
            'password' : {'write_only' : True},
            'image': {'required': False},
        }
        
    def create(self, validated_data) :
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None :
            instance.set_password(password)
        instance.save()
        return instance
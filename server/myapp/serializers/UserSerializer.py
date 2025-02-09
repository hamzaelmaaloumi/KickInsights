from rest_framework import serializers
from ..entities.UserModel import User, ProfileManager

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileManager
        fields = '__all__'
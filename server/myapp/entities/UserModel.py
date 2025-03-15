from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError

# Create your models here.


class User(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=255, default='user') 

    def __str__(self):
        return self.username

class ProfileManager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="manager_profile")
    phone_number = models.CharField(max_length=15, unique=False)  
    birthday = models.DateField()  
    nationality = models.CharField(max_length=50)  
    profile_picture = models.ImageField(upload_to='profile_pictures/') 

    def __str__(self):
        return f"{self.user.username}'s Manager Profile"

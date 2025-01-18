from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.core.exceptions import ValidationError

def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class User(AbstractUser) :
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    birthday = models.DateField(null=False, default=timezone.now)
    nationality = models.CharField(max_length=255)
    image = models.ImageField(upload_to=upload_to,
        null=True, 
        blank=True)

    username = None
    
    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = [] 

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_groups',  
        blank=True
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions',  
        blank=True
    )

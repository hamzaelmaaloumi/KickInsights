from django.db import models

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=50, null=False)
    entraineur = models.CharField(max_length=50, null=False)
    classement = models.IntegerField(null=False)
    stade = models.CharField(max_length=50, null=False)
from django.db import models

class Player(models.Model) :
    player_name = models.CharField(max_length=255, null=False)
    position = models.CharField(max_length=30, null=False)
    age = models.IntegerField(null=False)
    nationality = models.CharField(max_length=30, null=False)
    image = models.CharField(max_length=255, null=False)
    link = models.CharField(max_length=255, null=False)

from django.db import models

# Create your models here.

class League(models.Model) :
    league_name = models.CharField(max_length=60, null=False)
    image = models.CharField(max_length=255, null=False)
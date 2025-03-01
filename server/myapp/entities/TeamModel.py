from django.db import models

# Create your models here.

class Team(models.Model):
    image = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=50, null=False)
    entraineur = models.CharField(max_length=50, null=True, blank=True)
    classement = models.CharField(max_length=20, null=True, blank=True)
    joueurs_total = models.IntegerField(null=True, blank=True)
    moyenne_age = models.DecimalField(max_digits=4,decimal_places=2,null=True, blank=True)
    type = models.CharField(max_length=15,null=True, blank=True)
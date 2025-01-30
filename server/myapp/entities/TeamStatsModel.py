from myapp.entities.TeamStatsPartsModels import Attaque, Defense, Sommaire,Passes,GardienDeBut,Tirs,Duel
from myapp.entities.MatcheModel import Matche
from django.db import models

class TeamStats(models.Model) :
    matcheID = models.ForeignKey(Matche, on_delete=models.CASCADE)
    sommaire = models.ForeignKey(Sommaire, on_delete=models.CASCADE)
    tirs = models.ForeignKey(Tirs, on_delete=models.CASCADE)
    attaque = models.ForeignKey(Attaque, on_delete=models.CASCADE)
    passes = models.ForeignKey(Passes, on_delete=models.CASCADE)
    duels = models.ForeignKey(Duel, on_delete=models.CASCADE)
    defense = models.ForeignKey(Defense, on_delete=models.CASCADE)
    GardienDeBut = models.ForeignKey(GardienDeBut, on_delete=models.CASCADE)
    
    
    
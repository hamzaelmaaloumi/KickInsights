from django.db import models
from myapp.entities.TeamModel import Team
from myapp.entities.PlayerModel import Player

class Plays(models.Model) :
    teamID = models.ForeignKey(Team, on_delete=models.CASCADE, default=None)
    playerID = models.ForeignKey(Player, on_delete=models.CASCADE, default=None)
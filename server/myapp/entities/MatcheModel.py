from django.db import models
from .LeagueModel import League
from .TeamModel import Team
# Create your models here.

class Matche(models.Model) :
    class MatcheState(models.TextChoices) :
        WIN = 'W', 'Win'
        DRAW = 'D', 'Draw'
        LOSS = 'L', 'Loss'
    
    league = models.ForeignKey(League, on_delete=models.CASCADE, default=None)
    date = models.DateField(null=False)
    teamA = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='teamA', default=None)
    teamB = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='teamB', default=None)
    scoreA = models.IntegerField(null=False)
    scoreB = models.IntegerField(null=False)
    state = models.CharField(
        max_length=1,
        choices=MatcheState.choices
    )
    
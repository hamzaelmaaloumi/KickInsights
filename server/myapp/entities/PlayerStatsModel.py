from django.db import models
from myapp.entities.PlayerModel import Player
from myapp.entities.MatcheModel import Matche


class PlayerStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    match = models.ForeignKey(Matche, on_delete=models.CASCADE)
    minutes_played = models.IntegerField()
    shots_on_target = models.IntegerField()
    shots_off_target = models.IntegerField()
    shots_blocked = models.IntegerField()
    dribble_attempts_successful = models.IntegerField()
    touches = models.IntegerField()
    accurate_passes = models.IntegerField()
    total_passes = models.IntegerField()
    key_passes = models.IntegerField()
    crosses_accurate = models.IntegerField()
    long_balls_accurate = models.IntegerField()
    ground_duels_won = models.IntegerField()
    aerial_duels_won = models.IntegerField()
    fouls = models.IntegerField()
    was_fouled = models.IntegerField()
    clearances = models.IntegerField()
    interceptions = models.IntegerField()
    total_tackles = models.IntegerField()
    dribbled_past = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return f"Player: {self.player} - Match: {self.match}"





class GoalkeeperStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    match = models.ForeignKey(Matche, on_delete=models.CASCADE)
    minutes_played = models.IntegerField()
    saves = models.IntegerField()  
    saves_from_inside_box = models.IntegerField()  
    clearances = models.IntegerField()  
    blocked_shots = models.IntegerField()
    shots_on_target = models.IntegerField()
    shots_off_target = models.IntegerField()
    rating = models.FloatField()

    def __str__(self):
        return f"Goalkeeper: {self.player} - Match: {self.match}"
from django.db import models
from myapp.entities.PlayerModel import Player
from myapp.entities.MatcheModel import Matche


class PlayerStats(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    match = models.ForeignKey(Matche, on_delete=models.CASCADE)
<<<<<<< HEAD
    minutes_played = models.IntegerField(blank=True, null=True)
    shots_on_target = models.IntegerField(blank=True, null=True)
    shots_off_target = models.IntegerField(blank=True, null=True)
    shots_blocked = models.IntegerField(blank=True, null=True)
    dribble_attempts_successful = models.IntegerField(blank=True, null=True)
    touches = models.IntegerField(blank=True, null=True)
    accurate_passes = models.IntegerField(blank=True, null=True)
    total_passes = models.IntegerField(blank=True, null=True)
    key_passes = models.IntegerField(blank=True, null=True)
    crosses_accurate = models.IntegerField(blank=True, null=True)
    long_balls_accurate = models.IntegerField(blank=True, null=True)
    ground_duels_won = models.IntegerField(blank=True, null=True)
    aerial_duels_won = models.IntegerField(blank=True, null=True)
    fouls = models.IntegerField(blank=True, null=True)
    was_fouled = models.IntegerField(blank=True, null=True)
    clearances = models.IntegerField(blank=True, null=True)
    interceptions = models.IntegerField(blank=True, null=True)
    total_tackles = models.IntegerField(blank=True, null=True)
    dribbled_past = models.IntegerField(blank=True, null=True)
=======
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
>>>>>>> origin/master

    def __str__(self):
        return f"Player: {self.player} - Match: {self.match}"

<<<<<<< HEAD
class PlayerStatsWithTeam(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    match = models.ForeignKey(Matche, on_delete=models.CASCADE)
    note = models.DecimalField(max_digits=5,decimal_places=2,blank=True, null=True)
    minutes_joues = models.CharField(blank=True, null=True)
    but = models.CharField(blank=True, null=True)
    but_attendus = models.CharField(blank=True, null=True)
    passes_decisive = models.CharField(blank=True, null=True)
    touches = models.CharField(blank=True, null=True)
    passes_precises = models.CharField(blank=True, null=True)
    passes_cles = models.CharField(blank=True, null=True)
    centres = models.CharField(blank=True, null=True)
    passes_en_profondeur = models.CharField(blank=True, null=True)
    tirs_cadres = models.CharField(blank=True, null=True)
    tirs_non_cadres = models.CharField(blank=True, null=True)
    tirs_bloques = models.CharField(blank=True, null=True)
    tentatives_de_dribble = models.CharField(blank=True, null=True)
    duels_au_sol = models.CharField(blank=True, null=True)
    duels_aeriennes = models.CharField(blank=True, null=True)
    perte_de_balle = models.CharField(blank=True, null=True)
    tacles_recus = models.CharField(blank=True, null=True)
    fautes = models.CharField(blank=True, null=True)
    degagements = models.CharField(blank=True, null=True)
    interceptions = models.CharField(blank=True, null=True)
    tacles_totaux = models.CharField(blank=True, null=True)
    dribbles_subis = models.CharField(blank=True, null=True)
    grosses_occasions_crees = models.CharField(blank=True, null=True)
    hors_jeux = models.CharField(blank=True, null=True)
    sauves = models.CharField(blank=True, null=True)
    degagements_des_poings = models.CharField(blank=True, null=True)
    sorties = models.CharField(blank=True, null=True)
    sorties_aeriennes = models.CharField(blank=True, null=True)
=======




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
>>>>>>> origin/master

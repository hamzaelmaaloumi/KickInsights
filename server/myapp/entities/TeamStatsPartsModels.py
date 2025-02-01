from django.db import models

class Sommaire(models.Model):
    possession = models.DecimalField(max_digits=5, decimal_places=2)
    grandes_chances = models.PositiveIntegerField(blank=True, null=True)
    total_tirs = models.PositiveIntegerField(blank=True, null=True)
    arrets_gardien = models.PositiveIntegerField(blank=True, null=True)
    corner = models.PositiveIntegerField(blank=True, null=True)
    fautes = models.PositiveIntegerField(blank=True, null=True)
    passes = models.PositiveIntegerField(blank=True, null=True)
    tacles = models.PositiveIntegerField(blank=True, null=True)
    coups_francs = models.PositiveIntegerField(blank=True, null=True)
    cartons_jaunes = models.PositiveIntegerField(blank=True, null=True)

class Tirs(models.Model):
    tirs_cadres = models.PositiveIntegerField(blank=True, null=True)
    frappe_sur_poteau = models.PositiveIntegerField(blank=True, null=True)
    tirs_non_cadres = models.PositiveIntegerField(blank=True, null=True)
    tirs_bloques = models.PositiveIntegerField(blank=True, null=True)
    tirs_dans_surface = models.PositiveIntegerField(blank=True, null=True)
    tirs_hors_surface = models.PositiveIntegerField(blank=True, null=True)

class Attaque(models.Model):
    grosses_occasions_realisees = models.PositiveIntegerField(blank=True, null=True)
    grosses_occasions_manquees = models.PositiveIntegerField(blank=True, null=True)
    touchers_surface_reparation = models.PositiveIntegerField(blank=True, null=True)
    tacles_recus_dernier_tiers = models.PositiveIntegerField(blank=True, null=True)
    hors_jeux = models.PositiveIntegerField(blank=True, null=True)
    
class Passes(models.Model):
    passes_precises = models.IntegerField(blank=True, null=True)
    touches = models.IntegerField(blank=True, null=True)
    passes_vers_dernier_tiers = models.IntegerField(blank=True, null=True)
    dans_le_dernier_tiers = models.IntegerField(blank=True, null=True)
    longs_ballons = models.IntegerField(blank=True, null=True)
    transversales = models.IntegerField(blank=True, null=True)
    
class Duel(models.Model):
    duels = models.IntegerField(blank=True, null=True) 
    pertes_balle = models.IntegerField(blank=True, null=True) 
    duels_sol = models.IntegerField(blank=True, null=True) 
    duels_aeriens = models.IntegerField(blank=True, null=True)  
    dribbles = models.IntegerField(blank=True, null=True)

class Defense(models.Model) :
    tacles_gagnes = models.IntegerField(blank=True, null=True)
    tacles_totaux = models.IntegerField(blank=True, null=True)
    interceptions = models.IntegerField(blank=True, null=True)
    recuperations = models.IntegerField(blank=True, null=True)
    degagements = models.IntegerField(blank=True, null=True) 
    erreurs_menant_a_un_but = models.IntegerField(blank=True, null=True)
    
class GardienDeBut(models.Model) :
    arrets_du_gardien = models.IntegerField(blank=True, null=True)
    sorties_aeriennes = models.IntegerField(blank=True, null=True)
    coup_de_pied_de_but = models.IntegerField(blank=True, null=True)
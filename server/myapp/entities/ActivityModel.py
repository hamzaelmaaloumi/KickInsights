from django.db import models
from myapp.entities.UserModel import User

class ActivityModel(models.Model) :
    ACTIONS = [
        ('user_signup', 'Nouvel utilisateur inscrit'),
        ('manager_added', 'Nouveau gestionnaire ajouté'),
        ('players_scraped', 'Joueurs ajoutés via scraping'),
        ('teams_scraped', 'Équipes ajoutées via scraping'),
        ('leagues_scraped', 'Ligues ajoutées via scraping'),
        ('scraping_update', 'Mise à jour du scraping'),
    ]

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=50, choices=ACTIONS)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

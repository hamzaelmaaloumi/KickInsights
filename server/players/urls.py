from django.urls import path
from . import views

urlpatterns = [
    path('scrapPlayers/', views.scraping_players, name='scrapPlayers'),
    path('getPlayers/', views.getPlayers, name='allPlayers'),
]

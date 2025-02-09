from django.urls import path
from .presentation import PlayerController,TeamController,LeagueController, MatcheController, TeamStatsController, UserController

urlpatterns = [
    path('scrapPlayers/',PlayerController.scraping_players),
    path('getPlayers/',PlayerController.getAllplayers),
    path('scrapTeams/',TeamController.scraping_teams),
    path('scrapLeagues/',LeagueController.scraping_leagues),
    path('scrapMatches/',MatcheController.scraping_matches),
    path('scrapTeamStats/',TeamStatsController.scraping_team_Stats),
    path('user/', UserController.getAllUsers),
    path('user/create', UserController.addUser),
    path('user/login', UserController.loginUser)
]
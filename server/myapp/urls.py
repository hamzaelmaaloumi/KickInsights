from django.urls import path

from myapp.presentation import PlayerStatsController
from .presentation import PlayerController,TeamController,LeagueController, MatcheController, TeamStatsController, UserController

urlpatterns = [
    path('scrapPlayers/',PlayerController.scraping_players),
    path('getPlayers/',PlayerController.getAllplayers),
    path('getPositions/', PlayerController.get_positions),
    path('getPlayersTeams/',PlayerController.get_all_players_with_team),
    
    path('scrapTeams/',TeamController.scraping_teams),
    path('scrapPlayersTeams/',TeamController.scraping_players_teams),
    path("getTeams/",TeamController.getAllteams),
    path("getTeambyName/",TeamController.get_team_by_name),
    
    path('scrapLeagues/',LeagueController.scraping_leagues),
    path('getLeagues/',LeagueController.getAllLeagues),
    path('scrapPlayersLeagues/',LeagueController.scraping_players_leagues),
    
    path('scrapMatches/',MatcheController.scraping_matches),
    path('scrapTeamStats/',TeamStatsController.scraping_team_Stats),
    path('user/', UserController.getAllUsers),
    path('user/create/', UserController.addUser),
    path('user/login/', UserController.loginUser),
    path('getPlayerTeamStats/',PlayerStatsController.scraping_players_stats_with_teams),
    path('user/getUser/', UserController.user)
]
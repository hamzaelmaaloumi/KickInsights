from django.urls import path
from .presentation import PlayerController,TeamController,LeagueController, MatcheController, TeamStatsController

urlpatterns = [
    path('scrapPlayers/',PlayerController.scraping_players),
    path('getPlayers/',PlayerController.getAllplayers),
    path('scrapTeams/',TeamController.scraping_teams),
    path('scrapLeagues/',LeagueController.scraping_leagues),
    path('scrapMatches/',MatcheController.scraping_matches),
    # path('scrapTeamStats/',TeamStatsController.scraping_team_Stats),
]
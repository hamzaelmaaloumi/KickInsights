from django.urls import path
from myapp.presentation import PlayerStatsController
from .presentation import PlayerController,TeamController,LeagueController, MatcheController, TeamStatsController, UserController
from .presentation import TeamStatsPartsController, PlayerController, PlayerStatsController,TeamController,LeagueController, MatcheController, TeamStatsController, UserController, ActivityController

urlpatterns = [
    path('scrapPlayers/', PlayerController.scraping_players),
    path('Player/', PlayerController.getAllplayers),
    path('getPositions/', PlayerController.get_positions),
    path('getPlayersTeams/', PlayerController.get_all_players_with_team),
    
    path('scrapTeams/', TeamController.scraping_teams),
    path('scrapPlayersTeams/', TeamController.scraping_players_teams),
    path("getTeams/", TeamController.getAllteams),
    path("getTeambyName/", TeamController.get_team_by_name),
    path('Team/<int:team_id>', TeamController.getTeamById),
    
    path('scrapLeagues/', LeagueController.scraping_leagues),
    path('getLeagues/', LeagueController.getAllLeagues),
    path('scrapPlayersLeagues/', LeagueController.scraping_players_leagues),
    path('League/<int:league_id>', LeagueController.getLeagueById),

    path('scrapPlayerStats/', PlayerStatsController.scraping_player_Stats),
    path('getPlayerStats/', PlayerStatsController.get_all_player_stats),

    path('scrapGoalkeeperStats/', PlayerStatsController.scraping_goalkeeper_Stats),
    path('getGoalkeeperStats/', PlayerStatsController.get_all_goalkeeper_stats),
    
    path('scrapMatches/', MatcheController.scraping_matches),
    path('Match/', MatcheController.get_all_Matches),
    path('Match/<int:match_id>', MatcheController.getMatchById),

    path('TeamStats/<int:match_id>', TeamStatsController.getTeamStatsByMatchId),
    path('Summary/<int:summary_id>', TeamStatsPartsController.getSummaryById),
    path('Attack/<int:attack_id>', TeamStatsPartsController.getAttackById),
    path('Shoot/<int:shoot_id>', TeamStatsPartsController.getShootById),
    path('Passes/<int:passes_id>', TeamStatsPartsController.getPassesById),
    path('Dual/<int:dual_id>', TeamStatsPartsController.getDualById),
    path('Defense/<int:defense_id>', TeamStatsPartsController.getDefenseById),
    path('Goalkeeper/<int:goalkeeper_id>', TeamStatsPartsController.getGoalkeeperById),

    path('scrapTeamStats/', TeamStatsController.scraping_team_Stats),
    path('user/', UserController.getAllUsers),
    path('user/delete', UserController.deleteUser),
    path('user/create/', UserController.addUser),
    path('user/update/', UserController.updateUser),
    path('user/login/', UserController.loginUser),
    path('getPlayerTeamStats/', PlayerStatsController.scraping_players_stats_with_teams),
    path('user/getUser/', UserController.user),
    path('getManagers/', UserController.getManagers),
    path('getActivities/', ActivityController.get_activities),
    
    path('getPlayersNumber/',PlayerController.get_number_of_players),
    path('getTeamsNumber/',TeamController.get_number_of_teams),
    path('getLeaguesNumber/',LeagueController.get_number_of_leagues),
    path('getManagersNumber/',UserController.get_number_of_managers),
    path('getUsersNumber/',UserController.get_number_of_users)
]

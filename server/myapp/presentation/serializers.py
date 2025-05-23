from rest_framework import serializers
from myapp.entities.PlayerModel import Player
from myapp.entities.TeamModel import Team
from myapp.entities.LeagueModel import League
from myapp.entities.MatcheModel import Matche
from myapp.entities.TeamStatsModel import TeamStats
from myapp.entities.PlayerStatsModel import PlayerStats
from myapp.entities.TeamStatsPartsModels import Sommaire, Tirs, Attaque, Passes, Duel, Defense, GardienDeBut
from myapp.entities.PlaysModel import Plays
from myapp.entities.UserModel import User, ProfileManager
from myapp.entities.PlayerStatsModel import PlayerStatsWithTeam
from myapp.entities.PlayerStatsModel import PlayerStats, GoalkeeperStats

class PlayerSerializer (serializers.ModelSerializer) :
    class Meta :
        model = Player
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Team
        fields = '__all__'
        
class LeagueSerializer(serializers.ModelSerializer):
    class Meta :
        model = League
        fields = '__all__'
        
class MatcheSerializer(serializers.ModelSerializer):
    class Meta :
        model = Matche
        fields = '__all__'
        
class SommaireSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Sommaire
        fields = '__all__'
        
class AttaqueSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Attaque
        fields = '__all__'
        
class TirsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Tirs
        fields = '__all__'
        
class PassesSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Passes
        fields = '__all__'
        
class DuelSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Duel
        fields = '__all__'
        
class DefenseSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Defense
        fields = '__all__'
        
class GardienDeButSerializer(serializers.ModelSerializer) :
    class Meta :
        model = GardienDeBut
        fields = '__all__'
        
class TeamStatsSerializer(serializers.ModelSerializer) :
    class Meta :
        model = TeamStats
        fields = '__all__'

class PlayerStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStats
        fields = '__all__'

class GoalkeeperStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GoalkeeperStats
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileManager
        fields = '__all__'        

class PlaysSerializer(serializers.ModelSerializer) :
    class Meta:
        model = Plays
        fields = '__all__'
        
class PlayerStatsWithTeamSerializer(serializers.ModelSerializer) :
    class Meta :
        model = PlayerStatsWithTeam
        fields = '__all__'
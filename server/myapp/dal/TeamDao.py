from myapp.entities import TeamModel
from myapp.presentation.serializers import TeamSerializer

@staticmethod
def getAllteams() :
    return TeamModel.Team.objects.all()

@staticmethod
def get_team_by_name(team_name) :
    return TeamModel.Team.objects.filter(name = team_name).first()

@staticmethod
def get_team_by_id(team_id) :
    return TeamModel.Team.objects.filter(id = team_id).first()

@staticmethod
def add_team(team) :
    try :
        serializer = TeamSerializer(data=team)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except Exception as e:
        print(f"problem while inserting a team : {e}")
        
@staticmethod
def delete_team(team_name) :
    try :
        team = TeamModel.Team.objects.filter(name = team_name).first()
        team.delete()
    except :
        print("problem while deleting a team")
    
@staticmethod
def get_team_by_name(team_name) :
    return TeamModel.Team.objects.filter(name = team_name).first()

@staticmethod
def get_team_by_id(team_id) :
    return TeamModel.Team.objects.filter(id = team_id).first()
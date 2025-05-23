from myapp.entities import TeamModel
from myapp.presentation.serializers import TeamSerializer
from myapp.dal import TeamDao
from rapidfuzz import fuzz, process

team_variations = {
        "Rennes": "Stade Rennais",
        "USG": "Royale Union Saint-Gilloise",
        "PSG": "Paris Saint-Germain",
        "Man Utd": "Manchester United",
        "OM": "Olympique de Marseille",
        "Barca": "FC Barcelona",
        "Jena": "FC Carl Zeiss Jena",
        "SCCM" : "SC Chabab Mohammédia",
        "WAC" : "Wydad Casablanca"
    }

@staticmethod
def getAllteams() :
    return TeamModel.Team.objects.distinct('name')

@staticmethod
def get_team_by_name(team_name):
    if team_name in TeamDao.team_variations:
        name = TeamDao.team_variations[team_name] 
    else :
        name = team_name 
    db_teams = list(TeamModel.Team.objects.values_list("name", flat=True)) 
    result = process.extractOne(name, db_teams, scorer=fuzz.partial_ratio)
    if result:
        best_match, score, _ = result
        if score > 80:
            print(f"Matched '{team_name}' to '{best_match}' with {score}% similarity.")
            return TeamModel.Team.objects.filter(name = best_match).first()
    print(f"No close match found for '{team_name}'.")
    return None
    
@staticmethod
def is_exists(team_name):   
    return TeamModel.Team.objects.filter(name = team_name).first()

@staticmethod
def get_team_by_id(team_id) :
    return TeamModel.Team.objects.filter(id = team_id).first()

@staticmethod
def add_team(team):
    try:
        if is_exists(team["name"]) is None :
            serializer = TeamSerializer(data=team)
            if serializer.is_valid():
                obj = serializer.save()
                return obj.id
        return None
    except Exception as e:
        print(f"Problem while inserting a team: {e}")
        return None

        
@staticmethod
def delete_team(team_name) :
    try :
        team = TeamModel.Team.objects.filter(name = team_name).first()
        team.delete()
    except :
        print("problem while deleting a team")

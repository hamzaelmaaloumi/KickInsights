from myapp.entities import LeagueModel
from myapp.presentation.serializers import LeagueSerializer

@staticmethod
def getAllLeagues() :
    return LeagueModel.League.objects.all()

@staticmethod
def get_league_by_name(name) :
    return LeagueModel.League.objects.filter(league_name=name).first()

@staticmethod
def get_league_by_id(LeagueId) :
    return LeagueModel.League.objects.filter(id = LeagueId).first()

@staticmethod
def addLeague(league) :
    try :
        serializer = LeagueSerializer(data=league)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting League")
        
@staticmethod
def deleteLeague(name) :
    try :
        League = get_league_by_name(name)
        League.delete()
    except Exception as e :
        print("error while deleting League")
        
@staticmethod
def clearLeagues() :
    try :
        LeagueModel.League.objects.all().delete()
    except Exception as e :
        print("problem while deleting the Leagues")
        
@staticmethod
def get_number_of_leagues():
    return LeagueModel.League.objects.count()
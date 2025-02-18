from myapp.entities import MatcheModel
from myapp.presentation.serializers import MatcheSerializer


@staticmethod
def getAllMatches() :
    return MatcheModel.Matche.objects.all()

@staticmethod
def get_matche_by_id(MatcheId) :
    return MatcheModel.Matche.objects.filter(id = MatcheId).first()

@staticmethod
def get_matche_by_date(matcheDate) :
    print("matcheDate:", matcheDate)
    return MatcheModel.Matche.objects.filter(date = matcheDate).first()

@staticmethod
def addMatche(matche) :
    try :
        serializer = MatcheSerializer(data=matche)
        if serializer.is_valid() :
            serializer.save()
    except Exception as e :
        print("error while inserting Matche")
        
@staticmethod
def deleteMatche(matcheId) :
    try :
        Matche = get_matche_by_id(matcheId)
        Matche.delete()
    except Exception as e :
        print("error while deleting Matche")
        
@staticmethod
def clearMatches() :
    try :
        MatcheModel.Matche.objects.all().delete()
    except Exception as e :
        print("problem while deleting the Matches")
        
@staticmethod
def get_latest_matche_date() :
    return MatcheModel.Matche.objects.latest('date').date
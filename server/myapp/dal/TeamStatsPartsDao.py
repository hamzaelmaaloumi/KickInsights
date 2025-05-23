from myapp.entities import TeamStatsPartsModels
from myapp.presentation.serializers import AttaqueSerializer, DefenseSerializer, DuelSerializer, GardienDeButSerializer, PassesSerializer, SommaireSerializer, TirsSerializer

@staticmethod
def  get_attaque_by_id(attaqueID) :
    return TeamStatsPartsModels.Attaque.objects.filter(id=attaqueID).first()

@staticmethod
def  get_defense_by_id(defenseID) :
    return TeamStatsPartsModels.Defense.objects.filter(id=defenseID).first()

@staticmethod
def  get_duel_by_id(duelID) :
    return TeamStatsPartsModels.Duel.objects.filter(id=duelID).first()

@staticmethod  
def  get_gardien_de_but_by_id(gardienID) :
    return TeamStatsPartsModels.GardienDeBut.objects.filter(id=gardienID).first()

@staticmethod
def  get_passes_by_id(passeID) :
    return TeamStatsPartsModels.Passes.objects.filter(id=passeID).first()

@staticmethod
def  get_sommaire_by_id(sommaireID) :
    try:
        return TeamStatsPartsModels.Sommaire.objects.filter(id=sommaireID).first()
    except :
        print(f"dao says : {Exception}")

@staticmethod
def  get_tirs_by_id(tirsID) :
    return TeamStatsPartsModels.Tirs.objects.filter(id=tirsID).first()

@staticmethod
def add_attaque(attaque) :
    try :
        serializer = AttaqueSerializer(data=attaque)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except Exception as e :
        print("error while inserting attaque")
        
@staticmethod
def add_sommaire(sommaire) :
    try :
        print(sommaire)
        serializer = SommaireSerializer(data=sommaire)
        if serializer.is_valid() :
            obj = serializer.save()
            print(obj)
            return obj.id
    except : 
        print("error while inserting sommaire")
        
@staticmethod
def add_tirs(tirs) :
    try :
        serializer = TirsSerializer(data=tirs)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except :
        print("error while inserting a tir stats")

@staticmethod
def add_passes(passes) :
    try :
        serializer = PassesSerializer(data=passes)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except :
        print("error while inserting a passes stats")
        
@staticmethod
def add_duels(duels) :
    try :
        serializer = DuelSerializer(data=duels)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except :
        print("error while inserting a duels stats")
        
@staticmethod
def add_defense(defense) :
    try :
        serializer = DefenseSerializer(data=defense)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except :
        print("error while inserting a defense stats")
        
@staticmethod
def add_gardien_de_but(gardien_de_but) :
    try :
        serializer = GardienDeButSerializer(data=gardien_de_but)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj.id
    except :
        print("error while inserting a tir stats")        
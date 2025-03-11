from myapp.entities import OpponentModel
from myapp.presentation.serializers import MatcheSerializer
from myapp.serializers.OpponentSerializer import SummarySerializer, AttackingSerializer, PassingSerializer, DefendingSerializer, OtherSerializer, OpponentSerializer



@staticmethod
def getAllOpponents() :
    try:
        opponents = OpponentModel.Opponent.objects.all()
        return opponents
    except Exception as e:
        print(f"dao says {e}")

@staticmethod
def get_Opponent_by(OpponentId) :
    return OpponentModel.Opponent.objects.filter(id = OpponentId).first()

@staticmethod
def get_Opponent_by_date(OpponentDate) :
    print("OpponentDate:", OpponentDate)
    return OpponentModel.Opponent.objects.filter(date = OpponentDate).first()







@staticmethod
def add_summary(summary):
    serializer = SummarySerializer(data=summary)
    try:
        if serializer.is_valid():
            summary = serializer.save()
            return summary
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌ inserting summary ❌❌❌❌❌❌❌❌❌❌❌❌❌")

def clear_summary():
    try:
        OpponentModel.Summary.objects.all().delete()
    except Exception as e:
        raise e
    
    
@staticmethod
def add_attacking(attacking):
    serializer = AttackingSerializer(data=attacking)
    try:
        if serializer.is_valid():
            attacking = serializer.save()
            return attacking
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌ inserting attacking ❌❌❌❌❌❌❌❌❌❌❌❌❌")

def clear_attacking():
    try:
        OpponentModel.Attacking.objects.all().delete()
    except Exception as e:
        raise e
    
   

@staticmethod
def add_passing(passing):
    serializer = PassingSerializer(data=passing)
    try:
        if serializer.is_valid():
            passing = serializer.save()
            return passing
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌ inserting passes ❌❌❌❌❌❌❌❌❌❌❌❌❌")

def clear_passing():
    try:
        OpponentModel.Passing.objects.all().delete()
    except Exception as e:
        raise e
    
   

@staticmethod
def add_defending(defending):    
    serializer = DefendingSerializer(data=defending)
    try:
        if serializer.is_valid():
            defending = serializer.save()
            return defending
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌ inserting defending ❌❌❌❌❌❌❌❌❌❌❌❌❌")

def clear_defending():
    try:
        OpponentModel.Defending.objects.all().delete()
    except Exception as e:
        raise e
    
   

@staticmethod
def add_other(other):    
    serializer = OtherSerializer(data=other)
    try:
        if serializer.is_valid():
            other = serializer.save()
            return other
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌ inserting other ❌❌❌❌❌❌❌❌❌❌❌❌❌")

def clear_other():
    try:
        OpponentModel.Other.objects.all().delete()
    except Exception as e:
        raise e
    
    


@staticmethod
def add_Opponent(Opponent):
    serializer = OpponentSerializer(data=Opponent)
    try:
        if serializer.is_valid():
            serializer.save()
            return serializer.instance
        else:
            print("❌ Serializer validation errors:", serializer.errors)
            raise Exception(f"Validation failed: {serializer.errors}")
    except Exception as e:
        print("❌❌❌❌❌❌❌❌❌❌❌ inserting opponent ❌❌❌❌❌❌❌❌❌❌❌❌❌")
        raise e

def clear_opponent():
    try:
        OpponentModel.Opponent.objects.all().delete()
    except Exception as e:
        raise e
    
   

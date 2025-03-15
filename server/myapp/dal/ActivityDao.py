from myapp.entities import ActivityModel
from myapp.presentation.serializers import ActivitySerializer

@staticmethod
def get_last_activities() :
    activities = ActivityModel.ActivityModel.objects.order_by('-timestamp')[:5]
    return activities

@staticmethod
def add_activitie(activitie) :
    try :
        serializer = ActivitySerializer(data=activitie)
        if serializer.is_valid() :
            obj = serializer.save()
            return obj
    except Exception as e :
        print("error while inserting League")
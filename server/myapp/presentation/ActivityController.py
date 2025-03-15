from myapp.business import ActivityService
from rest_framework.decorators import api_view
from rest_framework.response import Response
from myapp.presentation.serializers import ActivitySerializer

@api_view(['GET'])
def get_activities(request):
    activities = ActivityService.get_last_activities()
    serializer = ActivitySerializer(activities, many=True)
    return Response(serializer.data)
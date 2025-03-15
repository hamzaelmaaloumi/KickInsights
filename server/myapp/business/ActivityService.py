from myapp.dal import ActivityDao

@staticmethod
def get_last_activities():
    return ActivityDao.get_last_activities()

@staticmethod
def add_activity(activitie):
    ActivityDao.add_activitie(activitie)
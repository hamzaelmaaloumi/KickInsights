from myapp.entities import UserModel



@staticmethod
def getAllUsers():
    return UserModel.User.objects.all()

@staticmethod
def getUserByUsername(username):
    return UserModel.User.objects.filter(username = username)

@staticmethod
def getUser(username, password):
    return UserModel.User.objects.filter(username = username, password = password).first()
    
@staticmethod
def deleteUser(user):
    return user.delete()

@staticmethod
def addUser(validate_user_data):
    return UserModel.User.objects.create(**validate_user_data)

@staticmethod
def addUserManager(validate_user_data):
    return UserModel.ProfileManager.objects.create(**validate_user_data)
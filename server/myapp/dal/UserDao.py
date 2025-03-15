from myapp.entities import UserModel
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os



@staticmethod
def getAllUsers():
    return UserModel.User.objects.all()

@staticmethod
def getAllManagers():
    usersPart = UserModel.User.objects.filter(role = "manager")
    profiles = UserModel.ProfileManager.objects.all()
    managers = []
    for (u,p) in zip(usersPart, profiles) :
        data ={
                "id" : u.pk,
                "username" : u.username,
                "password" : u.password,
                "phone_number" : p.phone_number,
                "birthday" : p.birthday,
                "nationality" : p.nationality,
                "profile_picture" : p.profile_picture.url,
            }
        print(data)
        managers.append(data)
            
    return managers

@staticmethod    
def get_admin():
    return UserModel.User.objects.filter(role = "admin").first()

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
def updateUser(old_username, new_data) :
    user = UserModel.User.objects.filter(username = old_username)
    id = user.first().pk
    user.update(username=new_data.get('username'), password = new_data.get('password'))
    profile = UserModel.ProfileManager.objects.filter(user = id)
    if profile.exists():
        profile_instance = profile.first()

        
        profile_picture = new_data.get('profile_picture')
        if profile_picture:
            
            file_name = profile_picture.name.replace(" ", "_")
            save_path = os.path.join("profile_pictures", file_name)
            file_path = default_storage.save(save_path, ContentFile(profile_picture.read()))            
            profile_instance.profile_picture = file_path

        profile_instance.phone_number = new_data.get('phone_number')
        profile_instance.birthday = new_data.get('birthday')
        profile_instance.nationality = new_data.get('nationality')
        profile_instance.save()
    return True

@staticmethod
def addUser(validate_user_data):
    return UserModel.User.objects.create(**validate_user_data)

@staticmethod
def addUserManager(validate_user_data):
    return UserModel.ProfileManager.objects.create(**validate_user_data)

@staticmethod
def get_number_of_managers():
    return UserModel.User.objects.filter(role='manager').count()

@staticmethod
def get_number_of_users():
    return UserModel.User.objects.filter(role='user').count()
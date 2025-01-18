from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('register/', views.register, name='registerAction'),
    path('login/', views.login, name='loginAction') ,
    path('user/', views.user, name='userAction'),
    path('logout/', views.logout, name='logoutAction')
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
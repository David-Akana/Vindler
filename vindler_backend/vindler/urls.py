# DEPRECATED
# from rest_framework_jwt.views import obtain_jwt_token


from django.urls import path
from . import views
from .views import *
from knox import views as knox_views


#user_vindle_requests

  
urlpatterns = [

    #path('get-data/', views.vindler_post),

    path('delete/<int:pk>/', vindler_delete.as_view()), # For Deleting
    path('register/', UserRegisteration.as_view()), # For Registeration
    path('login/', UserLogin.as_view()), # For Login
    path('user/', UserAPI.as_view()), # For regular authentication
    path('search-user/<str:username>', SearchUserAPI.as_view()), # for searching users
    path('vindler-requests/', vindler_requests.as_view()), #For post and get requests
    path('vindlerprofilepicture/',  ProfilePicture.as_view()), #For profile picture  post and get requests
    path('getvindlerprofilepicture/<str:name>',  GetProfilePicture.as_view()), #For profile picture get requests
    path('user-request/<str:username>', user_vindle_requests.as_view()), #For get requests
    path('logout/',knox_views.LogoutView.as_view(), name='knox_logout')
    
]  
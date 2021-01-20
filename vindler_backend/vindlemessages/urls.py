from django.urls import path
from .views import *

from . import views 

#user_vindle_requests

  
urlpatterns = [
    path('message-list/', MessageUserList.as_view()),
     path('<str:room_name>/', views.room, name='room'),
] 
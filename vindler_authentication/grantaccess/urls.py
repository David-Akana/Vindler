from django.urls import path
from .views import *

urlpatterns = [

    path('faceauth/', VindlerFaceAuthentication.as_view()),
    path('facepredict/', VindlerFacePredict.as_view())

] 
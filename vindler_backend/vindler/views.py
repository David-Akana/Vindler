#------------------------------------------------------------- For Serialization -------------------------------------------------------------------------

from rest_framework.parsers import FileUploadParser,  MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework import permissions 
#from django.shortcuts import render


# --------------------------------------------------------------------------------------------------------------------------------------------------------
import os
import numpy as np
import joblib, pickle
from . apps import GrantaccessConfig
from . models import VindlerFaceauthMapper, VindlerFaceauth, VindlerPredictions
from . multiple import for_multiple_files
from . serializers import VindlerFaceauthMapperSerializer, VindlerFaceauthSerializer, VindlerPredictionSerializer
from django.db.models import Count
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings

from . password_generator import generate_user_password


# -----------------------------------------------------------------------------------------------------
# Create your views here.

# using class based views


# This api collects multiple images
class VindlerFaceAuthentication(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser] 
    serializer_class = [VindlerFaceauthMapperSerializer, VindlerFaceauthSerializer]
    queryset = [VindlerFaceauth.objects.all(), VindlerFaceauthMapper.objects.all()]
    
    #permission_classes = [permissions.AllowAny,]

    def post(self, request, format=None):#*args, **kwargs):

        x, y, face_array = list(), list(), list()
        temp = {}
        target = generate_user_password()
        print('target', target)
        temp['targets'] = target
        train_images = images = dict((request.data).lists())['train_images']


        # map the target to the unique interger Id.
        mapper_Serializer = VindlerFaceauthMapperSerializer(data=temp)
        if mapper_Serializer.is_valid():
            mapper_Serializer.save()
            print('Created unique ids for targets')


        key = VindlerFaceauthMapper.objects.get(targets=target)
        uniq_id = key.id
   

        for image in train_images:

            modified_data = for_multiple_files(uniq_id, image)                   
            faceauth_Serializer = VindlerFaceauthSerializer(data=modified_data)#request.data

            if faceauth_Serializer.is_valid():
               
                faceauth_Serializer.save()

                face_array.append(faceauth_Serializer.data)

                print('Recieved Image ...')

                if len(face_array) != 10 :
                    pass

                else:
                    print('Preprocessing ...')
                    for hold in VindlerFaceauth.objects.select_related().filter(key=faceauth_Serializer['key'].value):

                        x1, y1 = GrantaccessConfig.LBPHAuthentication.create_dataset(str(hold.train_images), faceauth_Serializer['key'].value)
                        x.append(x1)
                        y.append(y1)

                    # create dummy train data & class
                    y.append(0)
                    s = x[0].shape
                    dummy = np.zeros(s)
                    x.append(dummy)

                    # learning
                    print('Learning ...')                    
                    FaceModel = GrantaccessConfig.LBPHAuthentication.Face_Auth()
                    FaceModel.train(x, np.array(y))

                    # updating the model
                    print('Updating ...')
                    update_model_path = os.path.join(settings.VINDLER_MODELS, 'FaceModel.yml')
                    FaceModel.save(update_model_path)
                    
                    return Response(face_array, status=status.HTTP_201_CREATED)

            else:

                #print('I got here 6')
                return Response(face_array, status=status.HTTP_400_BAD_REQUEST)



#  This class API only collects one image.

class VindlerFacePredict(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser] 
    serializer_class = [VindlerPredictionSerializer, VindlerFaceauthMapperSerializer]
    queryset = [VindlerPredictions.objects.all(), VindlerFaceauthMapper.objects.all()]
    
    def post(self, request, format=None):

        image_Serializer = VindlerPredictionSerializer(data=request.data)
        if image_Serializer.is_valid():
            image_Serializer.save()


            login_id = GrantaccessConfig.LBPHAuthentication.single_face_prediction(image_Serializer['images'].value)
            #print(1)

            login_passcode = VindlerFaceauthMapper.objects.get(id=login_id)
            #print(2)

            predicted = {'predicted_password':login_passcode.targets}

        return Response(predicted,  status=200)

   
         



# REFERENCES: https://www.techiediaries.com/django-rest-image-file-upload-tutorial/
# https://medium.com/swlh/build-your-first-rest-api-with-django-rest-framework-e394e39a482c
# https://www.goodcode.io/articles/django-rest-framework-file-upload/
# https://medium.com/backticks-tildes/lets-build-an-api-with-django-rest-framework-32fcf40231e5
# *** https://djangotricks.blogspot.com/2020/03/how-to-upload-a-file-using-django-rest-framework.html
# *** https://www.reddit.com/r/django/comments/4wfnsn/uploading_images_through_django_rest_framework/
# https://stackoverflow.com/questions/38848759/valueerror-all-the-input-arrays-must-have-same-number-of-dimensions <-- # for columns
# https://stackoverflow.com/questions/3881453/numpy-add-row-to-array  <-- # for rows
# https://stackoverflow.com/questions/52903232/how-to-upload-multiple-images-using-django-rest-framework
# https://stackoverflow.com/questions/40721512/assertionerror-at-posts-postlist-should-either-include-a-queryset-attribut
# using functions instead of classes : https://bezkoder.com/django-rest-api/
# https://pythonprogramming.net/foreign-keys-django-tutorial/

# integrating machine learning models
# https://datagraphi.com/blog/post/2019/12/19/rest-api-guide-productionizing-a-machine-learning-model-by-creating-a-rest-api-with-python-django-and-django-rest-framework
# https://towardsdatascience.com/productionize-a-machine-learning-model-with-a-django-api-c774cb47698c

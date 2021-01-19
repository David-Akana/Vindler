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
from . models import  Faceauth, Predictions
from . multiple import for_multiple_files
from . serializers import FaceauthSerializer, ImageSerializer
from django.db.models import Count
from django.http import JsonResponse
from django.http import HttpResponse
from django.conf import settings


# -----------------------------------------------------------------------------------------------------
# Create your views here.

# using class based views




# This api collects multiple images
class VindlerFaceAuthentication(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser] 
    serializer_class = FaceauthSerializer
    queryset = Faceauth.objects.all()
    
    #permission_classes = [permissions.AllowAny,]

    def post(self, request, format=None):#*args, **kwargs):  format=None
        x, y = list(), list()
        face_array = list()

        #print('I got here 1')
        #print(' ')
        #print(f'I am for auth {request.data}')

        print(request.data)

        targets = request.data['targets']
        train_images = images = dict((request.data).lists())['train_images']

        #print(targets)
        #print(train_images)

        for image in train_images:
            modified_data = for_multiple_files(targets, image)
                                         
            #print(modified_data)
            #print('I got here 2')

            faceauth_Serializer = FaceauthSerializer(data=modified_data)#request.data
            if faceauth_Serializer.is_valid():
                #print('I got here 3')
                faceauth_Serializer.save()

                face_array.append(faceauth_Serializer.data)

                #print('I got here 4')
                print('Recieved Image ...')

                if len(face_array) != 3 :
                    pass

                else:
                    print('Preprocessing ...')
                    for hold in Faceauth.objects.all():
                        if faceauth_Serializer['targets'].value == hold.targets:

                            x1, y1 = GrantaccessConfig.facenet_authentication.create_dataset(str(hold.train_images), faceauth_Serializer['targets'].value)#GrantaccessConfig.create_dataset(str(hold.train_images), faceauth_Serializer['targets'].value)#
                            x.extend(x1)
                            y.extend(y1)

                    x =  np.asarray(x)

                    # normalizing and emedding the x
                    norm_embedded_x = GrantaccessConfig.facenet_authentication.create_normalize_embedding( x )

                    # create dummy feature and target to by-pass single target classification issue
                    y.extend('0')
                    hold = [0]*norm_embedded_x.shape[1]
                    hold = np.array([hold])
                    norm_embedded_x = np.vstack([norm_embedded_x, hold])
                    y =  np.asarray(y)
                    #print(norm_embedded_x.ndim)

                    y_uniq = Faceauth.objects.values_list('targets', flat=True)
                    print(y_uniq)
                    y_uniq = np.unique(y_uniq)
                    y_uniq = np.append(y_uniq, '0') 

                    print(f'this is y_uniq == {y_uniq}')
                    print(f'this is  y == {y}')
                
                    # learning
                    print('Learning ...')
                    facemodel = GrantaccessConfig.facenet_authentication.Facemodel
                    FaceModel = facemodel.partial_fit(norm_embedded_x, y, classes= np.unique(y_uniq))


                    # updating the model
                    print('Updating ...')

                    update_model_path = os.path.join(settings.VINDLER_MODELS, 'FaceModel.sav')
                    with open(f"{update_model_path}", mode="wb") as updated_Fmodel:
                        pickle.dump(FaceModel, updated_Fmodel)


                    # predicting

                    #test = np.array([norm_embedded_x[0]])

                    
                    #y_predict = GrantaccessConfig.facenet_authentication.Facemodel.predict(test)
                    #y_prob2 = GrantaccessConfig.facenet_authentication.Facemodel.predict_proba(test)

                    #print(y_predict[0])
                    #print(y_prob2[0][0] * 100)

                    #print('I got here 5')

                    print("DONE!")
                    
                    return Response(face_array, status=status.HTTP_201_CREATED)
            else:

                #print('I got here 6')
                return Response(face_array, status=status.HTTP_400_BAD_REQUEST)

                    #print('I got here 6')
                    #return Response(face_array, status=status.HTTP_400_BAD_REQUEST)



#  This class API only collects one image.

class VindlerFacePredict(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser] 
    serializer_class = ImageSerializer
    queryset = Predictions.objects.all()
    
    def post(self, request, format=None): #*args, **kwargs):

        #print(f'I am for pred {request.data}')

        image_Serializer = ImageSerializer(data=request.data)#, instance=request.user)
        if image_Serializer.is_valid():
            image_Serializer.save()


            face_embedding = GrantaccessConfig.facenet_authentication.single_face_prediction(image_Serializer['images'].value)

            y_prob = GrantaccessConfig.facenet_authentication.Facemodel.predict_proba(face_embedding)
            y_prob = y_prob[0][0] * 100
            print(y_prob)

            if y_prob >= 0.0:

                y_predict = GrantaccessConfig.facenet_authentication.Facemodel.predict(face_embedding)
                y_predict = y_predict[0]

                print(y_predict)
                predicted = {'predicted_password':y_predict}
                return JsonResponse(predicted)
                #return Response(predicted,  status=200)
            else:
                y_predict = 0
                predicted = {'predicted_password':y_predict}
                print(y_predict)
                return JsonResponse(predicted)
                #return Response(predicted,  status=200)
   

         

#  This class API only collects one image.

'''
class ImageUploadView(generics.CreateAPIView):
    parser_classes = [MultiPartParser, FormParser] #[MultiPartParser, FormParser]
    serializer_class = FaceauthSerializer
    #permission_classes = [permissions.AllowAny,]
    def post(self, request, format=None): #*args, **kwargs):
        x, y = list(), list()
         
        faceauth_Serializer = FaceauthSerializer(data=request.data)#, instance=request.user)
   
        if faceauth_Serializer.is_valid():
            faceauth_Serializer.save()
            for hold in Faceauth.objects.all():
                if faceauth_Serializer['targets'].value == hold.targets:
                    x1, y1 = GrantaccessConfig.facenet_authentication.create_dataset(str(hold.train_images), faceauth_Serializer['targets'].value)#GrantaccessConfig.create_dataset(str(hold.train_images), faceauth_Serializer['targets'].value)#
                    x.extend(x1)
                    y.extend(y1)
            x =  np.asarray(x)
            # normalizing and emedding the x
            norm_embedded_x = GrantaccessConfig.facenet_authentication.create_normalize_embedding( x )
            # create dummy feature and target to by-pass single target classification issue
            y.extend('0')
            hold = [0]*norm_embedded_x.shape[1]
            hold = np.array([hold])
            norm_embedded_x = np.vstack([norm_embedded_x, hold])
            y =  np.asarray(y)
            #print(norm_embedded_x.ndim)
            
            # learning
            GrantaccessConfig.facenet_authentication.Facemodel.partial_fit(norm_embedded_x, y, classes= np.unique(y))
            # predicting
            test = np.array([norm_embedded_x[0]])
            y_predict = GrantaccessConfig.facenet_authentication.Facemodel.predict(test)
            y_prob2 = GrantaccessConfig.facenet_authentication.Facemodel.predict_proba(test)
            print(y_predict[0])
            print(y_prob2[0][0] * 100)
            
            return Response(faceauth_Serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(faceauth_Serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
'''






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

# integrating machine learning models
# https://datagraphi.com/blog/post/2019/12/19/rest-api-guide-productionizing-a-machine-learning-model-by-creating-a-rest-api-with-python-django-and-django-rest-framework
# https://towardsdatascience.com/productionize-a-machine-learning-model-with-a-django-api-c774cb47698c
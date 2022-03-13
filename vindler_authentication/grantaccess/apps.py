from django.apps import AppConfig
from django.conf import settings

# -------------------------------------------------------------for FaceNet ------------------------------------------------------------------------------
import os
#import mtcnn
import joblib, pickle
import pandas as pd
import numpy as np
from numpy import asarray
from PIL import Image

#import tensorflow.compat.v1 as tf
#tf.disable_v2_behavior()


from mtcnn.mtcnn import MTCNN
from os import listdir
#from matplotlib import pyplot
from numpy import expand_dims
import cv2

#from keras.models import load_model
#from keras_facenet import FaceNet
#from keras.models import model_from_json

#from sklearn.preprocessing import Normalizer
#from sklearn.svm import SVC
#from sklearn.linear_model import SGDClassifier
#from sklearn.metrics import confusion_matrix, classification_report, accuracy_score


# ---------------------------------------------------------------------------------------------------------------------------------------------------------


class GrantaccessConfig(AppConfig):
    name = 'grantaccess'

    class LBPHAuthentication:

        def __init__(self):
            pass


        @staticmethod
        def create_dataset(directory=None, target=None):
            image = directory[12:]

            dirc = settings.MEDIA_ROOT+ '/'+ 'train_images'
                
            path = dirc + image
            training_image = cv2.imread(path)

            # load faces
            face, bounding_box = GrantaccessConfig.LBPHAuthentication.face_detection(training_image)
            return face, target



        @staticmethod
        def face_detection(image):

            model_path = os.path.join(settings.VINDLER_MODELS, "haarcascade_frontalface_default.xml")
            image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            haar_classifier = cv2.CascadeClassifier(model_path)
            face = haar_classifier.detectMultiScale(image_gray, scaleFactor=1.3, minNeighbors=7)
            if len(face) == 0:
                print('hiiii face not detected!!!!!!!!!!!!!!')
                return image_gray, []
            (x,y,w,h) = face[0]
            return image_gray[y:y+w, x:x+h], face[0]



        # CV2 LBPH Face Detection Model
        @staticmethod
        def Face_Auth():

            FaceAuthenticator =  None
            current_model_path = os.path.join(settings.VINDLER_MODELS, 'FaceModel.yml')
            if not os.path.exists(current_model_path):
                print('using new model ... ')
                FaceAuthenticator = cv2.face.LBPHFaceRecognizer_create()
            else:
                print('using updated model ... ')
                FaceAuthenticator = cv2.face.LBPHFaceRecognizer_create()
                FaceAuthenticator.read(current_model_path)

            return FaceAuthenticator



        # single face predictions
        @staticmethod
        def single_face_prediction(image_directory=None):
            
            dirc = settings.MEDIA_ROOT+ '/'+ 'for_predictions'

            image = image_directory[22:]

            path = dirc + image

            login_image = cv2.imread(path)

            face_authenticator = GrantaccessConfig.LBPHAuthentication.Face_Auth()

            face, bounding_box = GrantaccessConfig.LBPHAuthentication.face_detection(login_image)

            label, _ = face_authenticator.predict(face)


            print(label)
            print(_)
        
            return label



# --------------------------------------------------------------------------FACE-NET-----------------------------------------------------------------------------------

    '''
    class facenet_authentication:

        def __init__(self):#self,directory,name_file,filename,face_pixels):
            pass
            #self.directory = directory
            #self.name_file = name_file
            #self.filename = filename
            #self.face_pixels = face_pixels
            

        # Extracting the face in the image

        norm = Normalizer(norm='l2') # using the ridge regularizer
        facenet_model_path = os.path.join(settings.VINDLER_MODELS, 'facenet_keras.h5')
        model = load_model(facenet_model_path)

        @staticmethod
        def extract_human_face(filename, size_needed=(160,160)):
        
            # load image from file
            #image = Image.open(settings.MEDIA_ROOT+ '/'+ 'train_images' +'/'+filename)
            image = Image.open(filename)

            # convert image to RGB, if needed
            image = image.convert('RGB')

            # convert to array
            pixels = asarray(image)
            # create the detector, using default weights
            detector = MTCNN()

            # detect faces in the image
            results = detector.detect_faces(pixels)


            # extract the bounding box from the first face
            x1, y1, width, height = results[0]['box']

            x1, y1 =  abs(x1), abs(y1)
            x2, y2 = x1 + width, y1 + height

            # extract the face using the coordinates
            face = pixels[y1:y2, x1:x2]

            # resize pizels to the model size
            image = Image.fromarray(face)
            image = image.resize(size_needed) # or  Image.resize((160,160))  # naturally, I prefer 224 x 224 but oh well
            face_array = asarray(image)
            
            return face_array

        @staticmethod
        def create_dataset(directory=None, name_file=None):
            image = directory[12:]
            faces = []
            targets = []

            #print(image)

            dirc = settings.MEDIA_ROOT+ '/'+ 'train_images'
            
            for _ in listdir(dirc):
                
                path = dirc + image

                #print(path)

                # load faces
                face = GrantaccessConfig.facenet_authentication.extract_human_face(path)
                faces.append(face)

                # load targets
                targets.append(name_file)# name_targ[sub.split('.')[0]])


            return faces, targets


        # generating the embeddings
        @staticmethod
        def get_embedding(face_pixels):


            # obtaining the facenet model
            embedder =  FaceNet()

            # scale pixel values
            face_pixels =face_pixels.astype('float32')
            
            # standardize pixel values across channels (global)
            mean,std = face_pixels.mean(), face_pixels.std()
            face_pixels = (face_pixels - mean) / std

            # transform face into one sample
            samples = expand_dims(face_pixels, axis=0)
            
            
            # make prediction to get embedding
            #embedding = embedder.embeddings(samples)

            y_embed = GrantaccessConfig.facenet_authentication.model.predict(samples)
            embedding = y_embed[0]


            return embedding

    
     
        @staticmethod
        def create_normalize_embedding(face_pixels):
            embedded_train_x = []

            # storing the embeddings
            for face_pixel in face_pixels:
                embedding = GrantaccessConfig.facenet_authentication.get_embedding(face_pixel)
                embedded_train_x.append(embedding)

           
            # embedding.shape[1] = 512
            # embedding.shape[0] = 1

            #print(embedded_train_x)
            #print(embedded_train_x[0])


            # converting to array
            embedded_train_x =  asarray(embedded_train_x)

            # reshaping the data
            #embedded_train_x = embedded_train_x.reshape((embedded_train_x.shape[0], embedding.shape[0]*embedding.shape[1]))

            # normalize the data
            
            embedded_x = GrantaccessConfig.facenet_authentication.norm.transform(embedded_train_x)

            return embedded_x

        # --------------------------------------- single predictions ----------------------------------------------

        @staticmethod
        def single_face_prediction(image_directory=None):
            # obtaining the facenet model
            #embedder =  FaceNet()
            norm = Normalizer(norm='l2') # using the ridge regularizer
            dirc = settings.MEDIA_ROOT+ '/'+ 'for_predictions'

            print(image_directory)
            #print(dirc)

            image = image_directory[22:]

            #print(image)

            path = dirc + image

            #print(path)

            face = GrantaccessConfig.facenet_authentication.extract_human_face(path)
            face_embedding = GrantaccessConfig.facenet_authentication.get_embedding(face)
            face_embedding = asarray(face_embedding)
            face_embedding = face_embedding.reshape((1, 1*128))
            face_embedding  = GrantaccessConfig.facenet_authentication.norm.transform(face_embedding)


            #face = GrantaccessConfig.facenet_authentication.create_prediction_face(image_directory)
            #face_sample = expand_dims(face, axis=0)
            #face_embedding = embedder.embeddings(face_sample)
            #face_embedding = GrantaccessConfig.facenet_authentication.get_embedding(face)
            return face_embedding



        model_path = os.path.join(settings.VINDLER_MODELS, "FaceModel.sav")
        with open(model_path, mode="rb") as Fmodel:
            Facemodel = pickle.load(Fmodel)

        #Facemodel = SGDClassifier(loss="log", penalty="l2") # passes as a logistic regression classifier   
                 


    facenet_auth = facenet_authentication
'''

# -------------------------------------------------------------------------------------------------------------------------------------------------------------------



# https://stackoverflow.com/questions/43048222/how-to-access-a-class-methods-within-static-class-methods
# https://www.kaggle.com/lianglirong/sklearn-joblib-serialization-and-unserialization
# https://stackoverflow.com/questions/24791987/why-do-i-get-pickle-eoferror-ran-out-of-input-reading-an-empty-file
# https://stackoverflow.com/questions/46288224/opencv-attributeerror-module-cv2-has-no-attribute-face

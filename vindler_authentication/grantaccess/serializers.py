from rest_framework import serializers
from .models import Faceauth, Predictions


class FaceauthSerializer(serializers.ModelSerializer):

	targets = serializers.CharField(max_length=None)  #TextField is not available for serializers
	train_images = serializers.ImageField(max_length=None)
	
                                  

	class Meta:
		model = Faceauth
		fields = ['targets', 'train_images']

# https://www.django-rest-framework.org/api-guide/fields/#charfield


# -------------------------------------------------------------------------------------------------------------------------------------------------------------

class ImageSerializer(serializers.ModelSerializer):

	images = serializers.ImageField(max_length=None)
	                          
	class Meta:
		model = Predictions
		fields = ['images']

































       

		    
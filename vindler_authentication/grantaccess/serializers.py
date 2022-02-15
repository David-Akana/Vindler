from rest_framework import serializers
from .models import VindlerFaceauthMapper, VindlerFaceauth, VindlerPredictions



class VindlerFaceauthMapperSerializer(serializers.ModelSerializer):

	targets = serializers.CharField(max_length=None)  #TextField is not available for serializers
                                  
	class Meta:
		model = VindlerFaceauthMapper
		fields = ['id','targets']



class VindlerFaceauthSerializer(serializers.ModelSerializer):

	#key = serializers.PrimaryKeyRelatedField(read_only=True)
	train_images = serializers.ImageField(max_length=None)
                                  

	class Meta:
		model = VindlerFaceauth
		fields = ['key', 'train_images']

# https://www.django-rest-framework.org/api-guide/fields/#charfield


# -------------------------------------------------------------------------------------------------------------------------------------------------------------

class VindlerPredictionSerializer(serializers.ModelSerializer):

	images = serializers.ImageField(max_length=None)
	                          
	class Meta:
		model = VindlerPredictions
		fields = ['images']
































       

		    
# DEPRECATED
# from rest_framework_jwt.settings import api_settings


from rest_framework import serializers
from . models import Vindles, VindlesProfilePicture
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


# user serializer
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['id','username']



# registeration serializer with knox authentication
class RegisterUserSerializer(serializers.ModelSerializer):

	password = serializers.CharField(write_only=True)

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance

	class Meta:
		model = User
		fields = ['id','username', 'password']


# login serializer 
class LoginUserSerializer(serializers.Serializer):

	username =  serializers.CharField()
	password = serializers.CharField()

	def validate(self, data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError("Incorrect Credentials")



	class Meta:
		model = User
		fields = ['id','username', 'password']


# Profile Picture serializer

class ProfilePictureSerializer(serializers.ModelSerializer):
	#user = UserSerializer(required=True)


	class Meta:
		model = VindlesProfilePicture
		fields = ['image','user']
		#extra_kwargs = {'user': {'read_only': False, 'required': True}}

	#def create(self, validated_data):
	#	user_data = validated_data.pop('user')
	#	user = UserSerializer.create(UserSerializer(), validated_data=user_data)
	#	vindlesprofilepicture, created = VindlesProfilePicture.objects.update_or_create(user=user,image=validated_data.pop('image'))

	#	return vindlesprofilepicture


	
      




# vindler serializer

class VindleSerializers(serializers.ModelSerializer):
	class Meta:
		model = Vindles
		#fields = '__all__'
		fields = ['id','name','post','time_posted','owner'] 





















### DEPRECATED !!!

'''
class RegisterUserSerializer(serializers.ModelSerializer):

	token = serializers.SerializerMethodField()
	password = serializers.CharField(write_only=True)

	def get_token(self, obj):
		jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
		jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

		payload = jwt_payload_handler(obj)
		token = jwt_encode_handler(payload)
		return token

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		instance = self.Meta.model(**validated_data)
		if password is not None:
			instance.set_password(password)
		instance.save()
		return instance

	class Meta:
		model = User
		fields = ['id','token', 'username', 'password']

'''
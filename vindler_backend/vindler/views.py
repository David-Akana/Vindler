#------------------------------------------------------------- For Serialization -------------------------------------------------------------------------

from rest_framework.parsers import FileUploadParser,  MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework import permissions 
from knox.models import AuthToken
#from django.shortcuts import render


#-----------------------------------------------------------------------------------------------------
from django.shortcuts import render
from .models import Vindles,  VindlesProfilePicture
from django.contrib.auth.models import User
from .serializers import  UserSerializer, RegisterUserSerializer, LoginUserSerializer, VindleSerializers, ProfilePictureSerializer
from .permissions import IsOwnerOrReadOnly
from collections import OrderedDict
import json

from django.conf import settings

# Create your views here.


# Post and Get requests

class vindler_requests(generics.ListCreateAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = VindleSerializers
	queryset = Vindles.objects.all()

	def post(self, request, format=None):

		
		
		serializer = VindleSerializers(data=request.data)
		if serializer.is_valid():
			serializer.save()

			user_name = User.objects.filter(username=serializer.data['name']).first()
			image = user_name.vindlesprofilepicture.image.url
			#data = settings.PHOTO_URL + str(image) 

			return Response({'id': serializer.data['id'],
				'name': serializer.data['name'],
				'post': serializer.data['post'],
				'time_posted': serializer.data['time_posted'], 
				'owner': serializer.data['owner'],
				'image': image}
				, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, format=None):

		vindles =  Vindles.objects.all().order_by("-time_posted")#
		serializer  = VindleSerializers(vindles,  context={'request': request}, many=True)

		#user_name = User.objects.filter(username=serializer.data[0]['name']).first()
		#image = user_name.vindlesprofilepicture.image.url
		#data = "http://127.0.0.1:8000" + str(image)

		final_list = []
		inner_list = []

		for i in range(len(serializer.data)):
			id_ = serializer.data[i]['id']
			inner_list.append(('id',id_))
			name = serializer.data[i]['name']
			inner_list.append(('name',name))
			post = serializer.data[i]['post']
			inner_list.append(('post',post))
			time_posted = serializer.data[i]['time_posted']
			inner_list.append(('time_posted',time_posted))
			owner = serializer.data[i]['owner']
			inner_list.append(('owner',owner))

			user_name = User.objects.filter(username=name).first()
			image = user_name.vindlesprofilepicture.image.url
			#data = settings.PHOTO_URL + str(image)
			inner_list.append(('image',image))
			ordered = OrderedDict(inner_list)
			final_list.append(ordered)
		   

		return Response(final_list)



# Get user vindle request
class user_vindle_requests(generics.ListCreateAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = VindleSerializers
	
	def get(self, request, username, format=None):

		#name=request.user

		vindles =  Vindles.objects.filter(name=username).order_by("time_posted")
		serializer  = VindleSerializers(vindles,  context={'request': request}, many=True)
		return Response(serializer.data)
		





# Delete requests

class vindler_delete(generics.GenericAPIView):

	permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

	def delete(self, request, pk, format=None):

		try:
			vindle = Vindles.objects.get(pk=pk)

		except  Vindles.DoesNotExist:
			return Response({'message': 'This Vindle does not exist'}, status=status.HTTP_404_NOT_FOUND)

		if request.method =='DELETE':
			vindle.delete()
			return Response({'message': 'Delete Successful!'}, status=status.HTTP_204_NO_CONTENT)



# Registeration requests
class UserRegisteration(generics.GenericAPIView):

	def post(self, request, format=None):
		serializer = RegisterUserSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()



			

			return Response({
				"user": UserSerializer(user,context=serializer).data,
				"token": AuthToken.objects.create(user)[1]})

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		

# Login requests
class UserLogin(generics.GenericAPIView):

	def post(self, request, format=None):
		serializer = LoginUserSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.validated_data

    	    
			return Response({
				"user": UserSerializer(user,context=serializer).data,
				"token": AuthToken.objects.create(user)[1]})

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		

	
# GET User Api
class UserAPI(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get_object(self):
		return self.request.user


# GET User Api
class SearchUserAPI(generics.RetrieveAPIView):
	permission_classes = [permissions.IsAuthenticated]
	serializer_class = UserSerializer

	def get(self, request, username, format=None):
	
		user =  User.objects.filter(username=username)

		if not user.exists():
			return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)

		serializer  = UserSerializer(user, context={'request': request}, many=True)
		return Response(serializer.data)


# For post request

class ProfilePicture(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser] 
    serializer_class = ProfilePictureSerializer
    queryset = VindlesProfilePicture.objects.all()
    
    def post(self, request, format=None): #*args, **kwargs):

        #data = {"user":json.loads(request.data['user']),"image":request.data['image']}
        

        get_id = request.data.get('user')
        try:
        	instance = VindlesProfilePicture.objects.get(user=get_id)
        except VindlesProfilePicture.DoesNotExist:
        	instance =None

        PP_Serializer = ProfilePictureSerializer(instance, data=request.data)#, instance=request.user)
        if PP_Serializer.is_valid(raise_exception=ValueError):
        	PP_Serializer.save()
        	return Response(PP_Serializer.data, status=status.HTTP_201_CREATED)
            
           
        return Response(PP_Serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    


class GetProfilePicture(generics.ListCreateAPIView):
    parser_classes = [MultiPartParser, FormParser] 
    serializer_class = ProfilePictureSerializer

    #permission_classes = [permissions.IsAuthenticated]
    #queryset = VindlesProfilePicture.objects.all()
   

    def get(self, request, name, format=None):

    	#pp_vindle = VindlesProfilePicture.objects.filter(owner=5).order_by('-id')[0]
    	#cserializer  = ProfilePictureSerializer(pp_vindle, context={'request': request}) #, many=True

    	#print(cserializer.data)

    	user = User.objects.filter(username=name).first()
    	image = user.vindlesprofilepicture.image.url
    	
    	#data = "http://127.0.0.1:8000" + str(image)
    	 
    	#serializer  = ProfilePictureSerializer(image, context={'request': request}, many=True)
    	return Response({"image": image})
























# Using function based  views for testing

'''
@api_view(['GET','POST'])
def vindler_post(request):
	if request.method == 'GET':

		vindles =  Vindles.objects.all()

		serializer = VindleSerializers(vindles,  context={'request': request}, many=True)

		return Response(serializer.data)

'''
















































# https://medium.com/@sostomc011/https-medium-com-sostomc011-getting-started-with-django-mysql-and-react-js-backend-b962a7691486
# https://medium.com/swlh/build-your-first-rest-api-with-django-rest-framework-e394e39a482c
# https://www.valentinog.com/blog/drf/
# https://blog.logrocket.com/creating-an-app-with-react-and-django/
# https://medium.com/better-programming/build-a-hello-world-react-app-with-a-django-api-backend-8ba814d89115
# https://stackoverflow.com/questions/40708201/serialize-a-django-model-with-a-foreignkey
# https://stackoverflow.com/questions/20248292/int-argument-must-be-a-string-or-a-number-not-files/20249588#20249588
# https://stackoverflow.com/questions/56298645/serializing-foreign-key-field



# https://bezkoder.com/django-rest-api/
# https://medium.com/django-rest/django-rest-framework-jwt-authentication-94bee36f2af8


# DEPRECATED
# https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
# https://medium.com/swlh/django-rest-framework-with-react-jwt-authentication-part-1-a24b24fa83cd
# https://medium.com/techspace-usict/django-rest-framework-with-react-jwt-authentication-part-2-8e272e866150
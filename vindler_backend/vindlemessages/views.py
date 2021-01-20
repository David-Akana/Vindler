from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import VindleUserMessageList
from .serializers import  VindleUserMessageListSerializers
from django.utils.safestring import mark_safe
import json

# Create your views here.


class  MessageUserList(generics.ListCreateAPIView):
	#permission_classes = [permissions.IsAuthenticated]
	serializer_class = VindleUserMessageListSerializers
	queryset = VindleUserMessageList.objects.all()

	def post(self, request, format=None):

		serializer = VindleUserMessageListSerializers(data=request.data)
		if serializer.is_valid():
			serializer.save() 
			return Response(serializer.data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, format=None):

		vindle_messages_user_list =  VindleUserMessageList.objects.all()#.order_by("time_posted")#
		serializer  = VindleUserMessageListSerializers(vindle_messages_user_list,  context={'request': request}, many=True)
		return Response(serializer.data)



from django.shortcuts import render
def room(request, room_name):
    return render(request, 'vindlemessages/test.html', {
        'room_name': room_name,
        
    })
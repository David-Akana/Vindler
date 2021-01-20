from rest_framework import serializers
from . models import VindleUserMessageList



class VindleUserMessageListSerializers(serializers.ModelSerializer):

	class Meta:
		model = VindleUserMessageList
		fields= ['username','username_id']

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class VindleUserMessageList(models.Model):
	username = models.CharField(max_length=30)
	username_id =  models.IntegerField()
 
	def __str__(self):
		return self.username 


class VindleMessages(models.Model):
	author = models.CharField(max_length=30)#ForeignKey(User, on_delete=models.CASCADE)
	content = models.TextField() 
	timestamp = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.author#.username

	def last_30_messages(self):
		return VindleMessages.objects.order_by('-timestamp').all()[:30]




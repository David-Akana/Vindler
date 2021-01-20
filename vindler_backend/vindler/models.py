from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class VindlesProfilePicture(models.Model):
	user = models.OneToOneField(User,on_delete=models.CASCADE)
	image = models.ImageField(default='default.jpg', upload_to='profile_pictures')
 
	def __str__(self):
		return f"{self.user.username}'s profile picture"   



class Vindles(models.Model):
	name = models.CharField(max_length=30)
	owner = models.ForeignKey(User, related_name='vindles',on_delete=models.CASCADE)
	post = models.TextField(max_length=300)
	time_posted = models.DateTimeField(auto_now_add=True) 

	def __str__(self):
		return self.name   


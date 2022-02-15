from django.db import models

# Create your models here.

# for data base for the features and target

class VindlerFaceauthMapper(models.Model):
	targets = models.CharField(max_length=30, unique=True)
	
	def __str__(self):
		return self.targets


class VindlerFaceauth(models.Model):
	key = models.ForeignKey(VindlerFaceauthMapper, on_delete=models.CASCADE)
	train_images = models.ImageField(upload_to='train_images',blank=True)
	
	def __str__(self):
		return self.key



class VindlerPredictions(models.Model):
	images = models.ImageField(upload_to='for_predictions',blank=True)

	def __str__(self):
		return self.images

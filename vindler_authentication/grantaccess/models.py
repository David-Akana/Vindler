from django.db import models

# Create your models here.

# for data base for the features and target
class Faceauth(models.Model):
	targets = models.TextField(max_length=60)
	train_images = models.ImageField(upload_to='train_images',blank=True)
	

	def __str__(self):
		return self.targets


class Predictions(models.Model):
	images = models.ImageField(upload_to='for_predictions',blank=True)

	def __str__(self):
		return self.images


from django import forms
#from .models import Faceauth


class ImageUpload(forms.ModelForm):
	class Meta:
		model = Faceauth
		fields = ['targets','train_images']



#imgfile  =   forms.ImageField(label = 'upload image')#,  help_text = 'The image should be cool.')
                                          
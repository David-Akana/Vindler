from django.contrib import admin

# Register your models here.
from .models import Vindles, VindlesProfilePicture

vindleModels = [Vindles, VindlesProfilePicture]

admin.site.register(vindleModels)


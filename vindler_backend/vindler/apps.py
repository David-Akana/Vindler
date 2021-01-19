from django.apps import AppConfig


class VindlerConfig(AppConfig):
    name = 'vindler'
# when login in to admin panel, comment line 8 and 9

    def ready(self):
    	import  vindler.signals

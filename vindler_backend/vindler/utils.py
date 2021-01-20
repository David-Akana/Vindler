# IGNORE THIS !!! THE LIBRARY HAS BEEN DEPRECATED

from vindler.serializers import UserSerializer, VindleSerializers

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
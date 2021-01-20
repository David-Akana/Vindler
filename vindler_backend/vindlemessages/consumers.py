

import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from .models import VindleMessages



class ChatConsumer(WebsocketConsumer):

    def fetch_vindlemessages(self, data):
        vmessages = VindleMessages.last_30_messages()
        content = {
            'vmessages': self.vmessages_to_json(vmessages)
        }
        self.send_message(content)

    def new_vindlemessages(self, data):

        author = data['username']   
        
        vindlemessages = VindleMessages.objects.create(
            author=author,
            content=data['message'])

        content = {
            'command': 'new_message',
            'message': self.message_to_json(vindlemessages)
        }
        
        return self.send_chat_messages(content)


    def vmessages_to_json(self, vmessages):

        result = []
        for message in vmessages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
        "author": message.author,#.username,
        "content": message.content,
        "timestamp": str(message.timestamp)  # str() the data if neccessarry
        }

    commands = {

        'fetch_vindlemessages':fetch_vindlemessages,
        'new_vindlemessages': new_vindlemessages 
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name #

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)


    def send_chat_messages(self, message):

        '''recieved_data = json.loads(message)
        author = text_data_json['author']
        content = text_data_json['content']
        time = text_data_json['timestamp']'''
    
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']
        # Send message to WebSocket
        self.send(text_data=json.dumps(message))



'''


import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        username = event['username']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
        }))

'''
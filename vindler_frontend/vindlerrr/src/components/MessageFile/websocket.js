class webSocketService {

    static instance = null;
    callbacks = {};

    static getInstance(){
        if (!webSocketService.instance){
            webSocketService.instance =  new webSocketService();
        }
        return webSocketService.instance;   
    }

    constructor() {
        this.socketRef = null;
    }

    connect() {

        const path = 'ws://127.0.0.1:8000/ws/chat/test';
        this.socketRef =  new WebSocket(path);

        this.socketRef.onopen = () =>{
            console.log('WebSocket is Open');
        };
        this.socketRef.onmessage = e =>{
            //sending a message
        };
        this.socketRef.onclose = () =>{
            console.log('WebSocket is closed');
            this.connect();
        };
    }

    socketNewMessage(data){
        const parsedData =  JSON.parse(data);
        const command =  parsedData.command;

        if( Object.keys(this.callbacks).length === 0){
            return;
        }
        if( command === 'messages'){
            this.callbacks[command](parsedData.messages);
        }
        if( command === 'new_vindlemessage'){
            this.callbacks[command](parsedData.message);
        }
    }

    fetchMessages(username){
        this.sendMessages({command: "fetch_vindlemessages", username: username});
    }

    newChatMessage(message){
        this.sendMessages({command: "new_vindlemessage", author: message.author, message: message.content});
    }

    addCallbacks(messagesCallback, newMessageCallback){

        this.callbacks['messages'] =  messagesCallback;
        this.callbacks['new_vindlemessage'] =  newMessageCallback;
    }

    sendMessage(data){

        try{
            this.socketRef.send(JSON.stringify({...data}))
        } catch(err){
            console.log(err.message);
        }
    }

    state() {
        return this.socketRef.readyState;
      }

    waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
            function(){
                if (socket.readyState === 1){
                    console.log('connection is secure');
                    if (callback != null){
                        callback();
                    }
                    return;
                } else{

                    console.log('waiting for connection ...');
                    recursion(callback);
                }

            }, 1);
    }

}

const webSocketInstance =  webSocketService.getInstance();

export default webSocketInstance;
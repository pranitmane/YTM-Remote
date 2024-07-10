import {responseObj} from './content'
export function connectSocket(){
    let socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
        console.log("connected to server");
    }
    return socket;
}

export function autoReconnect(onMessageCallback: (event: MessageEvent,socket:WebSocket) => void):WebSocket{
    let socket = connectSocket();
    socket.onclose = () => {
        console.log("reconnecting...")
        setTimeout(() => {
            socket = autoReconnect(onMessageCallback);
        },200);
    }
    socket.onmessage = (e)=>{
        onMessageCallback(e,socket);
    }
    return socket;
}

export function sendStatus(title:string,url:string,socket:WebSocket,isPlaying:boolean){
    let statusObj:responseObj = {
        type:"status",
        data:{
            title,
            url,
            isPlaying
        },
        message:"status"
    }
    socket.send(JSON.stringify(statusObj));
}

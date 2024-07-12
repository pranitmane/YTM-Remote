export function connectSocket(){
    let socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
        console.log("connected to server");
    }
    return socket;
}

export function autoReconnect(onMessageCallback: (event: MessageEvent) => void,streamStatus:(socket:WebSocket)=>void):WebSocket{
    let socket = connectSocket();
    socket.onclose = () => {
        console.log("reconnecting...")
        setTimeout(() => {
            socket = autoReconnect(onMessageCallback,streamStatus);
        },200);
    }
    socket.onmessage = (e)=>{
        onMessageCallback(e);
    }
    socket.onopen = ()=>{
        streamStatus(socket);
    }
    return socket;
}



console.log("hello from content script");
import { playNext, playPrevious, pauseOrPlay } from './controls'
import { autoReconnect } from './socket'

export type commandObj = {
    type: "command";
    data: {
        command: "playNext" | "playPrevious" | "pauseOrPlay";
    };
    message: string;
}

export type responseObj = {
    type: "status";
    data: {
        title: string;
        url: string;
        isPlaying: boolean;
    };
    message: string;
}


autoReconnect(handleCommand);


function handleCommand(event:any,socket:WebSocket) {
    let jsonData: commandObj = JSON.parse(event.data);
    console.log("ws type =>", jsonData.type)
    if (jsonData.data.command === "playNext") {
        console.log("playing next");
        playNext();
        sendStatus(socket);
    } else if (jsonData.data.command === "playPrevious") {
        playPrevious();
        sendStatus(socket);
    } else if (jsonData.data.command === "pauseOrPlay") {
        pauseOrPlay();
        sendStatus(socket);
    }
}

function sendStatus(socket:WebSocket) {
    let status: responseObj = {
        type: "status",
        data: {
            title: document.title,
            url: window.location.href,
            isPlaying: false
        },
        message: "status"
    }
    socket.send(JSON.stringify(status));
}








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
        isPlaying: "playing" | "paused" | "nothing" | "loading";
    };
    message: string;
}


autoReconnect(handleCommand, streamStatus);


function handleCommand(event: any) {
    let jsonData: commandObj = JSON.parse(event.data);
    console.log("ws type =>", jsonData.type)
    if (jsonData.data.command === "playNext") {
        console.log("playing next");
        playNext();
    } else if (jsonData.data.command === "playPrevious") {
        playPrevious();
    } else if (jsonData.data.command === "pauseOrPlay") {
        pauseOrPlay();
    }
}

function getStatus() {
    let status: responseObj = {
        type: "status",
        data: {
            title: document.title,
            url: document.querySelector("#thumbnail > #img")?.getAttribute("src") || "",
            isPlaying: isPlaying()
        },
        message: "status"
    }
    return status;
}

function isPlaying() {
    let player = document.querySelector("#layout > ytmusic-player-bar");
    let playUIState = document.querySelector("#player-page")?.getAttribute("play-ui-state")
    if (playUIState==="INACTIVE") {
        return "nothing"
    } else if (player?.querySelector("#play-pause-button")?.getAttribute("title") === "Pause") {
        return "playing"
    } else if (player?.querySelector("#play-pause-button")?.getAttribute("title") === "Play") {
        if (document.querySelector("#left-controls > div.left-controls-buttons.style-scope.ytmusic-player-bar > div")?.getAttribute("hidden") === null) {
            return "loading"
        } else {
            return "paused"
        }
    } else {
        return "nothing"
    }
}

function streamStatus(socket: WebSocket) {
    console.log("streaming status")
    let previousStatus = getStatus();
    const interval = setInterval(() => {
        if (socket.readyState === 1) {
            let currentStatus = getStatus();
            if (JSON.stringify(previousStatus) !== JSON.stringify(currentStatus)) {
                console.log("sending status")
                socket.send(JSON.stringify(currentStatus));
                previousStatus = currentStatus;
            } else {
                console.log("status not changed")
            }
        } else {
            console.log("socket not ready")
            clearInterval(interval);
        }
    }, 1000);
}









export function playNext(){
    let event = new KeyboardEvent('keydown',{
        key:"N",
        shiftKey:true
    });
    document.dispatchEvent(event);
}

export function playPrevious(){
    let event = new KeyboardEvent('keydown',{
        key:"P",
        shiftKey:true
    });
    document.dispatchEvent(event);
}

export function pauseOrPlay(){
    let event = new KeyboardEvent('keydown',{
        key:" "
    });
    document.dispatchEvent(event);
}


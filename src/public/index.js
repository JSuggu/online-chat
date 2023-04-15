const urlDomain = "http://localhost:3000";
const createButton = document.querySelector("#create-room");
const joinButton = document.querySelector("#join-room");
const nickName = document.querySelector("#nickname");


createButton.addEventListener("click", async e => {
    e.preventDefault();

    const response = await fetch(`${urlDomain}/room`, {method: "POST"});
    const roomName = (await response.json()).code;

    sessionStorage.setItem("username", nickName.value);
    sessionStorage.setItem("room", roomName);
    const roomStatus = (await fetch(`${urlDomain}/match/${roomName}`)).status;

    if(roomStatus == 200)
        window.location.href = `${urlDomain}/access/${roomName}`;
});

joinButton.addEventListener("click", async e => {
    e.preventDefault();
    
    const response = await fetch(`${urlDomain}/rooms`);
    const rooms = (await response.json()).rooms;

    const roomName = prompt("Ingresa el codigo de la sala");

    rooms.forEach( async room => {
        if(room.room_name == roomName){
            sessionStorage.setItem("username", nickName.value);
            sessionStorage.setItem("room", roomName);
            const roomStatus = (await fetch(`${urlDomain}/match/${roomName}`)).status;
            
            if(roomStatus == 200)
                window.location.href = `${urlDomain}/access/${roomName}`;
        }
    });
    
});
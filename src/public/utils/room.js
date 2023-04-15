const urlDomain = "https://chat-online-2mk6.onrender.com"//"http://localhost:3000";
const socket = io(urlDomain, {autoConnect:false});

var form = document.getElementById('form');
var input = document.getElementById('input');
const usersContainer = document.querySelector("#users");
const roomContainer = document.querySelector("#room");

const username = sessionStorage.getItem("username");
const roomChosen = sessionStorage.getItem("room");

if(!username){
    window.location.href = urlDomain;
}

socket.auth = { username: username, room: roomChosen };
socket.connect();

window.onbeforeunload = function(){
    return 'Are you sure you want to leave this page?';
};

window.onunload = function (){
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("room");
}

//IO EVENTS

socket.emit("new user", roomChosen);

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat message', input.value, username, roomChosen);
        input.value = '';
    }
});

socket.on("users", users =>{

    usersContainer.innerHTML = "";
    roomContainer.innerHTML = `Sala: ${roomChosen}`;

    users.forEach( user => {
        if(user.room == roomChosen){
            const spanElem = document.createElement("span");
            spanElem.setAttribute("class", "user");
            spanElem.innerHTML = user.username;
            usersContainer.appendChild(spanElem);
        }
    })
    
});

socket.on('chat message', (username, msg) => {
    var item = document.createElement('li');
    item.setAttribute("class", "p-2")
    item.innerHTML = `<b>${username}:</b> ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
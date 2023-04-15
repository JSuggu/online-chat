import express from "express";
import http from "http";
import { Server as WebSocketServer } from "socket.io";
import path from "path";
import { fileURLToPath } from 'url';
import {router}  from "./routes/routes.js";
import { queries } from "./controllers/db-queries.js";
import rooms from "./model/rooms.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, enc-entype, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const server = http.createServer(app);
const io = new WebSocketServer(server);

app.use("/", router);

server.listen(3000, () => {
    console.log("server running port 3000");
});


//EVENTS WEBSOCKETS
io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    const roomChoosen = socket.handshake.auth.room;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    socket.room = roomChoosen;
    next();
});

io.on('connection', (socket) => {

    socket.on("new user", room =>{
        socket.join(room);
    })

    const users = [];
    for (let [id, socket] of io.of(`/`).sockets) {
        users.push({
        userID: id,
        username: socket.username,
        room: socket.room
        });
    }

    io.emit("users", users);

    socket.on('chat message', (msg, username, room) => {
        io.to(room).emit('chat message', username, msg);  
    });

    socket.on("disconnect", () => {

        queries.exitRoom(socket.room);
        io.of(socket.room).in(socket.id).disconnectSockets();

        socket.username = null;
        socket.room = null;

        const newUsers = [];
        for (let [id, socket] of io.of("/").sockets) {
            newUsers.push({
            userID: id,
            username: socket.username,
            room: socket.room
            });
        }

        io.emit("users", newUsers);
      });
});



export {__dirname}


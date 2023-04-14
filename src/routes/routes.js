import express from "express";
import { queries } from "../controllers/db-queries.js";
import { __dirname } from "../index.js";

const router = express.Router();

router.get('/', (req, res) => {
    return res.sendFile(__dirname + '/public/index.html');
});

router.get("/access/:room", (req, res) => {
    return res.sendFile(__dirname + "/public/views/room.html")
})

router.post("/room", queries.addRoom);

router.get("/rooms", queries.getRooms);

router.get("/match/:room", queries.room);


export {router}
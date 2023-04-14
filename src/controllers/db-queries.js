import { pool } from "../model/connection.js";
import codeGenerator from "./codeGenerator.js";
import { __dirname } from "../index.js";

const queries = {

    addRoom: function(req, res){
        const roomCode = codeGenerator();

        pool.query("INSERT INTO rooms SET ?", {room_name: roomCode, user_amount: 0}, (err, result) => {
            if(err)
                return res.send({err:err})

            return res.send({code: roomCode});
        });
    },

    getRooms: function(req, res){

        pool.query("SELECT * FROM rooms", (err, result) => {
            if(err)
                return res.send({err: err});
            
            return res.send({rooms: result});
        });
    },

    room: function(req, res){
        const roomName = req.params.room;

        pool.query("SELECT * FROM rooms WHERE room_name = ?", [roomName], (err, result) => {
            if(err)
                return res.send({err:err})

            if(result.length === 0)
                return res.status(401).send("No existe la sala");

            const userAmount = result[0].user_amount;
            const roomId = result[0].id;

            if(userAmount > 4)
                return res.status(401).send("La sala esta llena");

            pool.query("UPDATE rooms SET user_amount = ? WHERE id = ?", [userAmount+1, roomId], (err, result) => {
                if(err)
                    return res.send({err: err});
            });

            return res.status(200).send();
        })
    },

    exitRoom: function(roomName){

        pool.query("SELECT * FROM rooms WHERE room_name = ?", [roomName], (err, result) => {
            if(err)
                return {err}
            
            const userAmount = result[0].user_amount;
            const roomId = result[0].id;

            pool.query("UPDATE rooms SET user_amount = ? WHERE id = ?", [userAmount-1, roomId], (err, result) => {
                if(err)
                return {err}
                
            });

            if(userAmount == 1 && roomName != "public"){
                pool.query("DELETE FROM rooms WHERE id = ?", [roomId], (err2, result2) => {
                    if(err2)
                    return {err: err2}
                });
            }

            return "Usuario ha salido de la sala"
        })
    }
}

export {queries}
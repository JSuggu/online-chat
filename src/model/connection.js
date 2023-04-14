import mysql from "mysql2";

const pool = mysql.createPool({
    host: "aws.connect.psdb.cloud", //"localhost",
    user: "33kic29udivcjyty1ph8", //"root",
    password: "pscale_pw_OufGrJ2tuG4ngCFejWX6Uq1cnWamZNU8Ap56bAwitJQ", //"41100188",
    database: "chat_rooms", //"rooms_chat",
    connectionLimit: 10,
    ssl: {
        rejectUnauthorized: true
    }
});

export {pool};

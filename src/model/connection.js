import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "41100188",
    database: "rooms_chat",
    connectionLimit: 10
});

export {pool};
import mysql from "mysql2";

const pool = mysql.createPool({
    host: "bydgh4rh3pb5izxeujmg-mysql.services.clever-cloud.com", //"localhost",
    user: "urffllvzo2cxkaci", //"root",
    password: "bFTS6dxXVD8OSpOrKXqY", //"41100188",
    database: "bydgh4rh3pb5izxeujmg", //"rooms_chat",
    port: "3306",
    connectionLimit: 10,
});

export {pool};

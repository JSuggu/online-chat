import { pool } from "./connection.js";

const rooms = `(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    room_name VARCHAR(10) NOT NULL UNIQUE,
    user_amount INT NOT NULL
)`

export default pool.query(`CREATE TABLE rooms ${rooms}`, (error, result) => {
    if(error)
        if(error.code === "ER_TABLE_EXISTS_ERROR")
            console.error("La tabla ya existe");

    if(result)
        console.log("tabla creada");
    return;
});
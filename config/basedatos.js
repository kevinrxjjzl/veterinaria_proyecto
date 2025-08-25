const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kevinJJZL78923190',
    database: 'veterinaria'
});

conexion.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
    } else {
        console.log("Conexión exitosa a la base de datos veterinaria");
    }
});

module.exports = conexion;
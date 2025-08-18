const express = require('express');
const mysql = require('mysql2');
const app = express();
const puerto = 3000;

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kevinJJZL78923190',
    database: 'veterinaria'
});

conexion.connect(err => {
    if (err) console.error("Error de conexión:", err);
    else console.log("Conexión exitosa a la base de datos");
});

app.get('/duenos', (req, res) => {
    conexion.query('SELECT * FROM Dueños', (err, result) => {
        if (err) res.status(500).send('Error al obtener dueños');
        else res.send(result);
    });
});

app.post('/duenos', (req, res) => {
    const { nombre, apellido, telefono, email, direccion } = req.body;
    const sql = 'INSERT INTO Dueños (nombre, apellido, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)';
    conexion.query(sql, [nombre, apellido, telefono, email, direccion], (err, result) => {
        if (err) res.status(500).send('Error al crear dueño');
        else res.send('Dueño creado correctamente');
    });
});

app.put('/duenos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, direccion } = req.body;
    const sql = 'UPDATE Dueños SET nombre=?, apellido=?, telefono=?, email=?, direccion=? WHERE id_dueño=?';
    conexion.query(sql, [nombre, apellido, telefono, email, direccion, id], (err, result) => {
        if (err) res.status(500).send('Error al actualizar dueño');
        else res.send('Dueño actualizado correctamente');
    });
});

app.delete('/duenos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Dueños WHERE id_dueño=?';
    conexion.query(sql, [id], (err, result) => {
        if (err) res.status(500).send('Error al eliminar dueño');
        else res.send('Dueño eliminado correctamente');
    });
});

app.get('/mascotas', (req, res) => {
    conexion.query('SELECT * FROM Mascotas', (err, result) => {
        if (err) res.status(500).send('Error al obtener mascotas');
        else res.send(result);
    });
});

app.post('/mascotas', (req, res) => {
    const { nombre, especie, raza, fecha_nacimiento, sexo, id_dueño } = req.body;
    const sql = 'INSERT INTO Mascotas (nombre, especie, raza, fecha_nacimiento, sexo, id_dueño) VALUES (?, ?, ?, ?, ?, ?)';
    conexion.query(sql, [nombre, especie, raza, fecha_nacimiento, sexo, id_dueño], (err, result) => {
        if (err) res.status(500).send('Error al crear mascota');
        else res.send('Mascota creada correctamente');
    });
});

app.put('/mascotas/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, fecha_nacimiento, sexo, id_dueño } = req.body;
    const sql = 'UPDATE Mascotas SET nombre=?, especie=?, raza=?, fecha_nacimiento=?, sexo=?, id_dueño=? WHERE id_mascota=?';
    conexion.query(sql, [nombre, especie, raza, fecha_nacimiento, sexo, id_dueño, id], (err, result) => {
        if (err) res.status(500).send('Error al actualizar mascota');
        else res.send('Mascota actualizada correctamente');
    });
});

app.delete('/mascotas/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Mascotas WHERE id_mascota=?';
    conexion.query(sql, [id], (err, result) => {
        if (err) res.status(500).send('Error al eliminar mascota');
        else res.send('Mascota eliminada correctamente');
    });
});

app.listen(puerto, () => {
    console.log(`Servidor levantado en http://localhost:${puerto}`);
});

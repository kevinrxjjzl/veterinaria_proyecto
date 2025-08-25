const express = require('express');
const router = express.Router();
const conexion = require('../config/basedatos');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Duenos'; 
    conexion.query(sql, (err, result) => {
        if (err) {
            console.log("error en la consulta");
            res.status(500).send('Error al obtener datos');
        } else {
            res.send(result);
        }
    });
});

router.post('/', (req, res) => {
  let data = {
    id_dueno: req.body.id_dueno,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
    email: req.body.email,
    direccion: req.body.direccion
  };
  let sql = 'INSERT INTO Duenos SET ?';
  conexion.query(sql, data, (err, result) => {
    if (err) {
      res.json({ mensaje: 'Error' });
    } else {
      res.json(result);
    }
  });
});

router.put('/:cod', (req, res) => {
  let cod = req.params.cod;
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let telefono = req.body.telefono;
  let email = req.body.email;
  let direccion = req.body.direccion;

  let sql = `UPDATE Duenos SET nombre = ?, apellido = ?, telefono = ?, email = ?, direccion = ? WHERE id_dueno = ?`;
  conexion.query(sql, [nombre, apellido, telefono, email, direccion, cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'positivo' });
    }
  });
});

router.delete('/:cod', (req, res) => {
  let cod = req.params.cod;
  let sql = `DELETE FROM Duenos WHERE id_dueno = ?`;
  conexion.query(sql, [cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'eliminado' });
    }
  });
});

module.exports = router;
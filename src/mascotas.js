const express = require('express');
const router = express.Router();
const conexion = require('../config/basedatos');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Mascotas'; 
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
    id_mascota: req.body.id_mascota,
    nombre: req.body.nombre,
    especie: req.body.especie,
    raza: req.body.raza,
    fecha_nacimiento: req.body.fecha_nacimiento,
    sexo: req.body.sexo,
    id_dueno: req.body.id_dueno
  };
  let sql = 'INSERT INTO Mascotas SET ?';
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
  let especie = req.body.especie;
  let raza = req.body.raza;
  let fecha_nacimiento = req.body.fecha_nacimiento;
  let sexo = req.body.sexo;
  let id_dueno = req.body.id_dueno;

  let sql = `UPDATE Mascotas SET nombre = ?, especie = ?, raza = ?, fecha_nacimiento = ?, sexo = ?, id_dueno = ? WHERE id_mascota = ?`;
  conexion.query(sql, [nombre, especie, raza, fecha_nacimiento, sexo, id_dueno, cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'positivo' });
    }
  });
});

router.delete('/:cod', (req, res) => {
  let cod = req.params.cod;
  let sql = `DELETE FROM Mascotas WHERE id_mascota = ?`;
  conexion.query(sql, [cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'eliminado' });
    }
  });
});

module.exports = router;
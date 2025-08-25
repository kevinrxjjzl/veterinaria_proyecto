const express = require('express');
const router = express.Router();
const conexion = require('../config/basedatos');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Vacunas'; 
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
    id_vacuna: req.body.id_vacuna,
    nombre_vacuna: req.body.nombre_vacuna,
    descripcion: req.body.descripcion,
    frecuencia_meses: req.body.frecuencia_meses
  };
  let sql = 'INSERT INTO Vacunas SET ?';
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
  let nombre_vacuna = req.body.nombre_vacuna;
  let descripcion = req.body.descripcion;
  let frecuencia_meses = req.body.frecuencia_meses;

  let sql = `UPDATE Vacunas SET nombre_vacuna = ?, descripcion = ?, frecuencia_meses = ? WHERE id_vacuna = ?`;
  conexion.query(sql, [nombre_vacuna, descripcion, frecuencia_meses, cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'positivo' });
    }
  });
});

router.delete('/:cod', (req, res) => {
  let cod = req.params.cod;
  let sql = `DELETE FROM Vacunas WHERE id_vacuna = ?`;
  conexion.query(sql, [cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'eliminado' });
    }
  });
});

module.exports = router;
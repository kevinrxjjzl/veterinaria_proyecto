const express = require('express');
const router = express.Router();
const conexion = require('../config/basedatos');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Vacunas_Aplicadas'; 
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
    id_vacuna_aplicada: req.body.id_vacuna_aplicada,
    id_mascota: req.body.id_mascota,
    id_vacuna: req.body.id_vacuna,
    fecha_aplicacion: req.body.fecha_aplicacion,
    proxima_aplicacion: req.body.proxima_aplicacion
  };
  let sql = 'INSERT INTO Vacunas_Aplicadas SET ?';
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
  let id_mascota = req.body.id_mascota;
  let id_vacuna = req.body.id_vacuna;
  let fecha_aplicacion = req.body.fecha_aplicacion;
  let proxima_aplicacion = req.body.proxima_aplicacion;

  let sql = `UPDATE Vacunas_Aplicadas SET id_mascota = ?, id_vacuna = ?, fecha_aplicacion = ?, proxima_aplicacion = ? WHERE id_vacuna_aplicada = ?`;
  conexion.query(sql, [id_mascota, id_vacuna, fecha_aplicacion, proxima_aplicacion, cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'positivo' });
    }
  });
});

router.delete('/:cod', (req, res) => {
  let cod = req.params.cod;
  let sql = `DELETE FROM Vacunas_Aplicadas WHERE id_vacuna_aplicada = ?`;
  conexion.query(sql, [cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'eliminado' });
    }
  });
});

module.exports = router;
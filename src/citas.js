const express = require('express');
const router = express.Router();
const conexion = require('../config/basedatos');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Citas'; 
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
    id_cita: req.body.id_cita,
    id_mascota: req.body.id_mascota,
    fecha_cita: req.body.fecha_cita,
    motivo: req.body.motivo,
    veterinario: req.body.veterinario,
    estado: req.body.estado
  };
  let sql = 'INSERT INTO Citas SET ?';
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
  let fecha_cita = req.body.fecha_cita;
  let motivo = req.body.motivo;
  let veterinario = req.body.veterinario;
  let estado = req.body.estado;

  let sql = `UPDATE Citas SET id_mascota = ?, fecha_cita = ?, motivo = ?, veterinario = ?, estado = ? WHERE id_cita = ?`;
  conexion.query(sql, [id_mascota, fecha_cita, motivo, veterinario, estado, cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'positivo' });
    }
  });
});

router.delete('/:cod', (req, res) => {
  let cod = req.params.cod;
  let sql = `DELETE FROM Citas WHERE id_cita = ?`;
  conexion.query(sql, [cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'eliminado' });
    }
  });
});

module.exports = router;
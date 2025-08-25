const express = require('express');
const router = express.Router();
const conexion = require('../config/basedatos');

router.get('/', (req, res) => {
    let sql = 'SELECT * FROM Historial_Medico'; 
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
    id_historial: req.body.id_historial,
    id_mascota: req.body.id_mascota,
    fecha: req.body.fecha,
    descripcion: req.body.descripcion,
    diagnostico: req.body.diagnostico,
    tratamiento: req.body.tratamiento,
    veterinario: req.body.veterinario
  };
  let sql = 'INSERT INTO Historial_Medico SET ?';
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
  let fecha = req.body.fecha;
  let descripcion = req.body.descripcion;
  let diagnostico = req.body.diagnostico;
  let tratamiento = req.body.tratamiento;
  let veterinario = req.body.veterinario;

  let sql = `UPDATE Historial_Medico SET id_mascota = ?, fecha = ?, descripcion = ?, diagnostico = ?, tratamiento = ?, veterinario = ? WHERE id_historial = ?`;
  conexion.query(sql, [id_mascota, fecha, descripcion, diagnostico, tratamiento, veterinario, cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'positivo' });
    }
  });
});

router.delete('/:cod', (req, res) => {
  let cod = req.params.cod;
  let sql = `DELETE FROM Historial_Medico WHERE id_historial = ?`;
  conexion.query(sql, [cod], (err, result) => {
    if (err) {
      console.log('Error');
    } else {
      res.json({ mensaje: 'eliminado' });
    }
  });
});

module.exports = router;
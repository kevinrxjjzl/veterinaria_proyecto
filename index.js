const express = require('express');
const mysql = require('mysql2');
const app = express();
const puerto = 3000;

app.use(express.json());

app.get('/xxx', (req, res) => {
    res.send('ruta de inicio');
    console.log("aviso para admi");
});

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
        console.log("conexion exitosa");
    }
});

// GET, POST, PUT, DELETE para Duenos
app.get('/veterinaria/duenos', (req, res) => {
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

app.post('/veterinaria/duenos', (req, res) => {
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

app.put('/veterinaria/duenos/:cod', (req, res) => {
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

app.delete('/veterinaria/duenos/:cod', (req, res) => {
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

// GET, POST, PUT, DELETE para Mascotas
app.get('/veterinaria/mascotas', (req, res) => {
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

app.post('/veterinaria/mascotas', (req, res) => {
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

app.put('/veterinaria/mascotas/:cod', (req, res) => {
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

app.delete('/veterinaria/mascotas/:cod', (req, res) => {
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

// GET, POST, PUT, DELETE para Historial_Medico
app.get('/veterinaria/historial', (req, res) => {
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

app.post('/veterinaria/historial', (req, res) => {
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

app.put('/veterinaria/historial/:cod', (req, res) => {
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

app.delete('/veterinaria/historial/:cod', (req, res) => {
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

// GET, POST, PUT, DELETE para Vacunas
app.get('/veterinaria/vacunas', (req, res) => {
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

app.post('/veterinaria/vacunas', (req, res) => {
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

app.put('/veterinaria/vacunas/:cod', (req, res) => {
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

app.delete('/veterinaria/vacunas/:cod', (req, res) => {
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

// GET, POST, PUT, DELETE para Vacunas_Aplicadas
app.get('/veterinaria/vacunasAplicadas', (req, res) => {
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

app.post('/veterinaria/vacunasAplicadas', (req, res) => {
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

app.put('/veterinaria/vacunasAplicadas/:cod', (req, res) => {
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

app.delete('/veterinaria/vacunasAplicadas/:cod', (req, res) => {
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

// GET, POST, PUT, DELETE para Citas
app.get('/veterinaria/citas', (req, res) => {
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

app.post('/veterinaria/citas', (req, res) => {
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

app.put('/veterinaria/citas/:cod', (req, res) => {
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

app.delete('/veterinaria/citas/:cod', (req, res) => {
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

app.listen(puerto, () => {
    console.log("servidor levantado GO");
});
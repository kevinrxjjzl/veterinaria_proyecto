const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "max1602",
  database: "veterinaria"
});

conexion.connect(err => {
  if (err) {
    console.error("Error de conexion:", err);
    return;
  }
  console.log("Conectado a la base de datos Veterinaria lest go");
});

app.get("/duenos", (req, res) => {
  conexion.query("SELECT * FROM Duenos", (err, results) => {
    if (err) {
      console.error("Error Duenos:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/mascotas", (req, res) => {
  conexion.query("SELECT * FROM Mascotas", (err, results) => {
    if (err) {
      console.error("Error Mascotas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/historial_medico", (req, res) => {
  conexion.query("SELECT * FROM Historial_Medico", (err, results) => {
    if (err) {
      console.error("Error Historial_Medico:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/vacunas", (req, res) => {
  conexion.query("SELECT * FROM Vacunas", (err, results) => {
    if (err) {
      console.error("Error Vacunas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/vacunas_aplicadas", (req, res) => {
  conexion.query("SELECT * FROM Vacunas_Aplicadas", (err, results) => {
    if (err) {
      console.error("Error Vacunas_Aplicadas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/citas", (req, res) => {
  conexion.query("SELECT motivo FROM Citas", (err, results) => {
    if (err) {
      console.error("Error Citas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


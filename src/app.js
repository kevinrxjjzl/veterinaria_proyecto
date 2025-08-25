const express = require('express');
const app = express();
const puerto = 3000;

app.use(express.json());

const duenosRouter = require('./duenos');
const mascotasRouter = require('./mascotas');
const historialRouter = require('./historial');
const vacunasRouter = require('./vacunas');
const vacunasAplicadasRouter = require('./vacunasAplicadas');
const citasRouter = require('./citas');


app.use('/veterinaria/duenos', duenosRouter);
app.use('/veterinaria/mascotas', mascotasRouter);
app.use('/veterinaria/historial', historialRouter);
app.use('/veterinaria/vacunas', vacunasRouter);
app.use('/veterinaria/vacunasAplicadas', vacunasAplicadasRouter);
app.use('/veterinaria/citas', citasRouter);

app.get('/xxx', (req, res) => {
    res.send('ruta de inicio');
    console.log("aviso para admi");
});

app.listen(puerto, () => {
    console.log("Servidor levantado GO");
});
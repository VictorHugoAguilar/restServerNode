const color = require('colors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// MIDDLEWARE se disparan por cada peticion que hacemos
// parse application/x - www - form - urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// importamos el acceso a las rutas de las consulta rest
app.use(require('./routes/usuario'));

const mongoose = require('mongoose');

// traemos el archivo de configuracion
require('./config/config');

// conexion con la base de datos utilizando mongoose
mongoose.connect('mongodb://localhost:27017/cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// comprobamos si se ha realizado la conexion success o fail
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('BD Online'.green);
});

// Creamos la escucha del servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando desde ' + fecha());
    console.log('Escuchando el puerto ' + process.env.PORT);

});

const fecha = () => {
    let fecha = new Date();
    return fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds() + ":" + fecha.getMilliseconds();
}
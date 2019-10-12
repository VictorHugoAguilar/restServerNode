const express = require('express');
const app = express();

const bodyParser = require('body-parser');

// MIDDLEWARE se disparan por cada peticion que hacemos
// parse application/x - www - form - urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// traemos el archivo de configuracion
require('./config/config');

// obtener registro
app.get('/', (req, res) => {

    res.json('App Rest Server');

});

// obtener registro
app.get('/usuario', (req, res) => {

    res.json('App Rest Server - GET USUARIO');

});

// crear registro
app.post('/usuario', (req, res) => {

    // Capturamos en la peticions post lo que se envie en el cuerpo, cuando el bodyparse procese en put, delete, post
    let body = req.body;

    if (body.nombre === undefined) {

        // devolvemos un código de respuesta en este caso de badRequest porque falta el nombre
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario',
        });

    } else {

        //'App Rest Server - POST USUARIO'
        res.json({ persona: body });

    }
});

// actualizar registros
app.put('/usuario/:id', (req, res) => {

    // obtener el parametro que pasamos por la barra
    let id = req.params.id;

    //'App Rest Server - PUT USUARIO'
    res.json({
        id: id
    });

});

// borrar registros
app.delete('/usuario', (req, res) => {

    res.json('App Rest Server - DELETE USUARIO');

});

app.listen(process.env.PORT, () => {

    console.log('Escuchando el puerto ' + process.env.PORT);

});
const express = require('express');
const app = express();
// importamos para encriptar las contraseñas
const bcrypt = require('bcrypt');
// importamos una extencion para los objetos de javascript
const _ = require('underscore');
// importamos el objeto usuario
const Usuario = require('../models/usuario');


// obtener registro
app.get('/', (req, res) => {

    res.json('App Rest Server');

});

//obtener registro de usuarios
app.get('/usuario', (req, res) => {

    // creamos una variable para hacer una paginación
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // creamos un limite
    let limite = req.query.limite || 5;
    limite = Number(limite);

    // podemos excluir algun campo en el segundo parametro de la 
    // funcion de find ({}, 'aqui seguidos sin comas')
    Usuario.find({}, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            // contamos los registros antes de devolver los valores
            Usuario.count({}, (err, cantidad) => {
                res.json({
                    ok: true,
                    cantidad: cantidad,
                    usuarios: usuarios
                })
            })
        });
});

// crear registro
app.post('/usuario', (req, res) => {

    // Capturamos en la peticions post lo que se envie en el cuerpo, cuando el bodyparse procese en put, delete, post
    let body = req.body;

    // instanciamos un usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 1),
        role: body.role
    });

    // guardamos en la base de datos

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // retornamos el usuario
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

// actualizar registros
app.put('/usuario/:id', (req, res) => {

    // obtener el parametro que pasamos por la barra
    let id = req.params.id;

    // obtener la información del body
    /** Utilizando underscore "_" definimos los objetos que se van a poder
     * modificar, pasando como segundo argumento un array con el nombre 
     * de las propiedades que se pueden modificar solamente
     */
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // obtener el modelo
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //'App Rest Server - PUT USUARIO'
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

// borrar registros
app.delete('/usuario', (req, res) => {

    res.json('App Rest Server - DELETE USUARIO');

});


module.exports = app;
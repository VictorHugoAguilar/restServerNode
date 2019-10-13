// borrar registros definitivamente utilizando la siguiente ruta /usuario/del/:id
app.delete('/usuario/:id', (req, res) => {
    // obtenemos el id que pasamos por parámetro
    let id = req.params.id;

    // creamos un objeto que cambia el estado
    let cambiaEstado = {
        estado: false
    };

    // con este metodo buscamos un usuario por id y luego lo eliminamos
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        // si se produce un error, devolvemos el estado 400, y el error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //en caso de no encontrar un usuario tenemos pasar el error de no encontrado
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        // si se ha podido eliminar devolvemos un ok, y el usuario borrado
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});



// borrar cambiando el estado no eliminando el registro
app.delete('usuario/:id', function(req, res) {
    // obtenemos el id que pasamos por parámetro
    let id = req.params.id;

    // creamos un objeto que cambia el estado
    let cambiaEstado = {
        estado: false
    };

    // Ahora no eliminaremos, si no que pondremos en el estado false
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        // si se produce un error, devolvemos el estado 400, y el error
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //en caso de no encontrar un usuario tenemos pasar el error de no encontrado
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        // si se ha podido eliminar devolvemos un ok, y el usuario borrado
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});
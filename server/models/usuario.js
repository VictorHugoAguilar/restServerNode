const mongoose = require('mongoose');
// instanciamos el validador unico importado
var uniqueValidator = require('mongoose-unique-validator');

// obtener el esquema para crear los objetos
let Schema = mongoose.Schema;

// configuramos un enum para pasar roles válidos
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{PATH} no es un rol válido'
}

// Creamos el modelo de usuario con sus propiedades
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La constraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// sobreescribimos el métiodo toJSON que es el que nos imprime el objeto de devuelta
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

// exportamos el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);
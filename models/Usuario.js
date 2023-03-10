const {Schema, model} = require('mongoose');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: false
    },
    via: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    escalera: {
        type: String,
        required: false
    },
    planta: {
        type: String,
        required: false
    },
    puerta: {
        type: String,
        required: false
    },
    poblacion: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }
});


module.exports = model('Usuario', UsuarioSchema);
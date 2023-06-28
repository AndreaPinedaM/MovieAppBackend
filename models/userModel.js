const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    // Definir los campos que va a tener la coleccion
    name: { //nombre del campo
        type: String,
        required: [true, 'Por favor ingresa un nombre']
    },
    email: { //nombre del campo
        type: String,
        required: [true, 'Por favor ingresa un email'],
        unique: true  //el email debe ser único, no debe existir dos registros con el mismo
    },
    password: { //nombre del campo
        type: String,
        required: [true, 'Por favor ingresa una contraseña']
    },
    favMovies: {
        type: Array,
        default: []
    }
}, {
    /* Adding a createdAt and updatedAt field to the schema. */
    timestamps: true
})

module.exports = mongoose.model('User', userSchema) 
const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // referencia al esquema 
        required: true //Los datos se obtendran del token
    },
    // Definir los campos que va a tener la coleccion
    original_title: { //nombre del campo
        type: String,
        required: [true, 'Por favor teclea un titulo']
    },
    overview: {
        type: String,
        required: [true, 'Por favor teclea una descripcion']
    },
    poster_path: {
        type: String,
        require: [true, "Indica el link del poster"]
    },
    release_date: {
        type: String,
        required: [true, "Indica la fecha de lanzamiento"]
    },
    vote_average: {
        type: Number,
        required: [true, "Introduce la calificacion de la pelicula"]
    },
    vote_count: {
        type: Number,
        required: [true, "Introduce la cantidad de votos de la película"]
    }
    }, {
        /* Adding a createdAt and updatedAt field to the schema. */
        timestamps: true
})

module.exports = mongoose.model('Movie', movieSchema)
const asyncHandler = require("express-async-handler");
//importar el modelo
const Movie = require("../models/movieModel");
const User = require('../models/userModel')

const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find();

    res.status(200).json(movies);
});

const setMovies = asyncHandler(async (req, res) => {
    if (
        !req.body.original_title ||
        !req.body.overview ||
        !req.body.poster_path ||
        !req.body.release_date ||
        !req.body.vote_average ||
        !req.body.vote_count ||
        !req.user.id
    ) {
        res.status(400);
        throw new Error("Favor de completar todos los campos");
    }

    const movie = await Movie.create({
        original_title: req.body.original_title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
        vote_average: req.body.vote_average,
        vote_count: req.body.vote_count,
        //Determina el usuario que crea la tarea
        user: req.user.id,
    })
    if (movie) {
        res.status(201).json({
            original_title: req.body.original_title,
            overview: req.body.overview,
            poster_path: req.body.poster_path,
            release_date: req.body.release_date,
            vote_average: req.body.vote_average,
            vote_count: req.body.vote_count,
        })
    } else {
        res.status(400)
        throw new Error("No se pudo crear la pelicula.")
    }

    /* `res.status(201).json(movie);` is sending a response to the client with a status code of 201
    (Created) and the movie object that was just created. */
    res.status(201).json(movie);
});

const updateMovies = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(400);
        throw new Error("Pelicula no encontrada");
    }

    if (movie.user.toString() != req.user.id) {
        res.status(401);
        throw new Error("Acceso no autorizado. El usuario y token no coinciden");
    }

    const modifiedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(modifiedMovie);
});

const setFavMovies = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        const userId = req.user.id
        const newFavMovie = movie.original_title
        const user = await User.findById(userId);
        const isFavorited = user.favMovies.some(movie => movie === newFavMovie);
        if (!isFavorited) {
            user.favMovies.push(newFavMovie);
            await user.save();
            res.json({ message: `El usuario ${req.user.name} con id ${userId} agrego la pelicula ${newFavMovie} con exito` })
        } else {
            res.json({ message: `Esta pelicula ya existe en la DB del usuario` })
        }
    } catch (error) {
        res.json('Error al agregar la película a la lista de favoritos:', error.message);
    }
})

const removeFavoriteMovie = asyncHandler(async (req, res) => {
    try {
        // Obtén el documento del usuario por su _id
        const movie = await Movie.findById(req.params.id);
        const userId = req.user.id
        const user = await User.findById(userId);
        const deletedMovie = movie.original_title

        // Elimina el elemento del array favMovies
        user.favMovies = user.favMovies.filter(film => film !== deletedMovie);

        // Guarda los cambios en la base de datos
        await user.save();

        console.log('Película eliminada de la lista de favoritos:', deletedMovie);

        res.json({ message: `El usuario ${req.user.name} con id ${userId} elimino la pelicula ${deletedMovie} con exito` })
    } catch (error) {
        console.error('Error al eliminar la película de la lista de favoritos:', error.message);
    }
});

const deleteMovies = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        res.status(400);
        throw new Error("Pelicula no encontrada");
    }

    if (movie.user.toString() != req.user.id) {
        res.status(401);
        throw new Error("Acceso no autorizado. El usuario y token no coinciden");
    }

    const deleteMovie = await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({
        id: req.params.id,
    });
});

module.exports = {
    getMovies,
    setMovies,
    updateMovies,
    setFavMovies,
    removeFavoriteMovie,
    deleteMovies,
};

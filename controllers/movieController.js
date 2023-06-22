const asyncHandler = require("express-async-handler");
//importar el modelo
const Movie = require("../models/movieModel");

const getMovies = asyncHandler(async (req, res) => {
    // res.json({ message: "getMovies" });

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

    res.status(201).json(movie);
});

const updateMovies = asyncHandler(async (req, res) => {
    res.json({ message: "updateMovies" });

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

const deleteMovies = asyncHandler(async (req, res) => {
    res.json({ message: "deleteMovies" });
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
    deleteMovies,
};

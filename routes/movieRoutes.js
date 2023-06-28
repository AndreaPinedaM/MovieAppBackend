const { Router } = require('express')
const express = require('express')
const router = express.Router()
const { getMovies, setMovies, updateMovies, deleteMovies, setFavMovies, removeFavoriteMovie } = require('../controllers/movieController')
const { protect } = require('../middleware/authMiddleware')


// router.get('/', getTareas)
// router.post('/', setTareas)
router.route('/').get(getMovies).post(protect, setMovies)


// router.put('/:id', updateTareas)
// router.delete('/:id', deleteTareas)
router.route('/:id').put(protect, updateMovies).delete(protect, deleteMovies)
router.route('/:id/favorites').put(protect, setFavMovies)
router.route('/:id/removefavs').put(protect, removeFavoriteMovie)

module.exports = router 
const { Router } = require('express')
const express = require('express')
const router = express.Router()
const { getMovies, setMovies, updateMovies, deleteMovies } = require('../controllers/movieController')
const {protect} = require('../middleware/authMiddleware') 


// router.get('/', getTareas)
// router.post('/', setTareas)
router.route('/').get(getMovies).post(protect, setMovies)


// router.put('/:id', updateTareas)
// router.delete('/:id', deleteTareas)
router.route('/:id').put(protect, updateMovies).delete(protect, deleteMovies)

module.exports = router 
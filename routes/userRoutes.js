const { Router } = require('express')
const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getMyData, updateUser, deleteUser } = require('../controllers/userController')
const{protect} =require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/login', loginUser)
//Poniendo la funcion protect(authMiddleware) se protege el endpoint
router.get('/mydata', protect, getMyData)

router.route('/:id').put(protect, updateUser).delete(protect, deleteUser)

module.exports = router
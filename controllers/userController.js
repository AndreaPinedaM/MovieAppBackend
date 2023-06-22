const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
//importar el modelo 
const User = require('../models/userModel')

const loginUser = asyncHandler(async (req, res) => {
    //Desestructurar la info. del body request
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Favor de llenar los datos requeridos')
    }

    //Verificar que el usuario exista
    const user = await User.findOne({ email })

    //Comparar el hash del password y el usuario
    if (user && (await bcrypt.compare(password, user.password))) { //Compara el string que recibo en el body vs el password hasheado
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales Incorrectas')
    }
})

//REGISTRAR USUARIO
const registerUser = asyncHandler(async (req, res) => {
    //Desestructurar el body request
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Favor de verificar que esten completos los datos')
    }

    //Verificamos que el email sea único
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('Ese email ya fue registrado')
    }

    //Hash al password con sal
    const salt = await bcrypt.genSalt(10) //10 rondas para generar la sal
    const hashedPassword = await bcrypt.hash(password, salt)

    //Crear usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error("No se pudo crear el usuario, datos incorrectos")
    }
})

const getMyData = asyncHandler(async (req, res) => {
    // res.json({message: 'Mis datos'})
    res.json(req.user)
})

const updateUser = asyncHandler(async (req, res) => {
    const { name } = req.body

    // Modificar usuario
    const userModificado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json("updated user: ", userModificado)
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json("deleted user: ", user)
    // const deleteUser = await User.findByIdAndDelete(req.params.id);
})

//Se genera el JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    loginUser,
    getMyData,
    registerUser,
    updateUser,
    deleteUser
}


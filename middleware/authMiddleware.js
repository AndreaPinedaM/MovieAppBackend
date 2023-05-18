const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) =>{
    //token variable
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //obtener el token del encabezado despues de la palabra Bearer
            token = req.headers.authorization.split(' ')[1]

            //verificar la firma
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtener el usuario del token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('No se recibio ningun token')
    }

})

module.exports = {
    protect
}
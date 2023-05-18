const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const connectDB =require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( {extended: false} ))

/* Loading the routes */
app.use('/api/movies', require('./routes/movieRoutes')) 
app.use('/api/users', require('./routes/userRoutes')) 

app.use(errorHandler)

app.listen(port, () => console.log(`Server iniciado en el puerto ${port}`))
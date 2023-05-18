const mongoose = require('mongoose')

/**
 * This function connects to the MongoDB database using the Mongoose library and the MongoDB URI stored
 * in the environment variable MONGO_URI.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB
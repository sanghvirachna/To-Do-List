const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
const Connection = () => {
    mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true
    })
    mongoose.connection.on('connected', () => {
        console.log("Connected to MongoDB")
    })
    mongoose.connection.on('error', (err) => {
        console.log("Error connecting to MongoDB", err)
    })
}
module.exports = Connection;
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const router = require('./routes/main')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandlerMiddleware)


app.listen(5000, async()=>{
    mongoose.set('strictQuery',false)
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Server at http://localhost:5000")
})
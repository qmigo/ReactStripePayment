const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: String,
    cart: [{
        productId: mongoose.Types.ObjectId,
        qty: Number
    }]
})

module.exports = mongoose.model('User', userSchema)
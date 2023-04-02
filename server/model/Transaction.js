const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    sale: [
        {
            qty: Number,
            price: Number,
            productId: mongoose.Types.ObjectId
        }
    ]
},{timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)
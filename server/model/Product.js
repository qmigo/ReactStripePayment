const mongoose = require('mongoose')

// const productSchema = new mongoose.Schema({
//     name: String,
//     desc: String,
//     size: [String],
//     brand: String,
//     price: Number,
//     color: [String],
//     img: [ String ],
//     ratings: Number,
//     category: String
// })

const productSchema = new mongoose.Schema({
    title: String,
    brand: String,
    price: Number,
    discount: Number,
    profile: [{
        code: String,
        urls: [String]
    }],
    colors: [{
        code: String,
        name: String,
    }],
    size: [{
        code: String,
        chest: String,
        length: String,
        waist: String,
        bust: String
    }],
    ratings: Number,
    stars: Number,
    details: [{
        property: String,
        value: String
    }],
},{timestamps: true})

module.exports = mongoose.model('product', productSchema)


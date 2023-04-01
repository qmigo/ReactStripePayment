require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const errorHandlerMiddleware = require('./middleware/errorHandler')
const router = require('./routes/main')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())
app.use('/', router)
app.use(errorHandlerMiddleware)

// app.post('/checkout', async(req, res)=>{
    
//     try {
//         const {cart} = req.body
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             mode: "payment",
//             line_items: cart.map(({id, name, img, desc, qty, price})=>{
//                 return {
//                     price_data: {
//                         currency: "inr",
//                         product_data: {
//                             name,
//                             description: desc,
//                             images: [img]
//                         },
//                         unit_amount: price*100
//                     },
//                     quantity: qty
//                 }
//             }),
//             success_url: `${process.env.CLIENT_URL}/payment-success`,
//             cancel_url: `${process.env.CLIENT_URL}/payment-failure`
//         })
//         res.json({url: session.url})
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({msg: "Something Went Wrong"})
//     }

// })

// app.post('/addToCart', (req, res)=>{
//     const { product } = req.body
//     console.log(product)
//     res.status(200).json({msg:"Success"})
// })

app.listen(5000, async()=>{
    mongoose.set('strictQuery',false)
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Server at http://localhost:5000")
})
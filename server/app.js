require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
app.use(cors())
app.use(express.json())


app.post('/checkout', async(req, res)=>{
    
    try {
        const {cart} = req.body
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: cart.map(({id, name, img, desc, qty, price})=>{
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name,
                            description: desc,
                            images: [img]
                        },
                        unit_amount: price*100
                    },
                    quantity: qty
                }
            }),
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failure`
        })
        res.json({url: session.url})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Something Went Wrong"})
    }

})

app.listen(5000, ()=>{
    console.log("Server at http://localhost:5000")
})
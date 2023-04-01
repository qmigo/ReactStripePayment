const checkout = async(req, res)=>{
    
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

}

module.exports = {checkout}
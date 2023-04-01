const Product = require('../model/Product')
const User = require('../model/User')
const CustomAPIError = require('../error/customError')

const addToCart = async(req, res)=>{
    const {userId, productId} = req.body
    
    if(!userId)
    throw new CustomAPIError(400, "UserId necessary")
    const user = await User.findByIdAndUpdate(userId,
        {
            $push: { 
             cart: {
                'productId':productId,
                'qty': 1
             } 
            }
        },
        {
            runValidators: true,
            new: true
        })
    return res.status(200).json({user})
}

const getCart = async(req, res)=>{

    const {userId} = req.query
    
    if(!userId)
    throw new CustomAPIError(400, 'userId is empty')

    const products = await User.findById(userId).select("cart")
    console.log(products.cart)
    
    const cart = await Promise.all(
        products.cart.map(async({productId, qty})=>{
            const res = await Product.findById(productId)
            return {...res._doc, qty}
        })
    )
    res.json({cart})
}

// 64287309493b21042d6cb93b prod
// 64288e25361c937ecddb51ea user

const updateCart = async(req, res)=>{
    const {userId, productId, quantity} = req.query

    if(!userId || !productId || !quantity)
    throw new CustomAPIError(400, 'userId is empty')

    await User.findOneAndUpdate(
        {
            _id: userId,
            'cart.productId': productId
        },
        {   
            
            $set: {
                'cart.$.qty': quantity
            }
        },
        {
            runValidators: true,
            new: true
        }
    )

    res.status(200).json({success:true})
}

const removeFromCart = async (req, res)=>{
    console.log('remove')
    const {userId, productId} = req.query

    if(!userId || !productId )
    throw new CustomAPIError(400, 'userId is empty')

    await User.findOneAndUpdate(
        {
            _id: userId,
        },
        {
            $pull: {
                "cart": {
                    "productId": productId
                }
            }
        },
        {
            runValidators: true,
            new: true
        }
    )

    res.status(200).json({success:true})
}

module.exports = {addToCart, getCart, updateCart, removeFromCart}
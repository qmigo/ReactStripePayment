const Product = require('../model/Product')
const User = require('../model/User')
const Transaction = require('../model/Transaction')

const addProduct = async(req, res)=>{ 
    const product = await Product.create(req.body)
    res.status(200).json({product})
}

const getAllProducts = async(req, res)=>{
    const products = await Product.find({})
    res.status(200).json({products})
}

const getAllUsers = async(req, res)=>{
    const users = await User.find({})
    res.status(200).json({users})
}

const clearTransactions = async (req, res)=>{
    await Transaction.deleteMany({})
    res.status(200).json({msg:"Success"})
}
module.exports = {
    addProduct,
    getAllProducts,
    getAllUsers,
    clearTransactions
}
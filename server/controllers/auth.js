const User = require('../model/User')
const CustomAPIError = require('../error/customError')

const register = async(req,res)=>{

    const {username, password} = req.body
    
    if(!username || !password)
    throw new CustomAPIError(400,"Username and Email Mandatory")

    const user = await User.create(req.body)
    res.status(200).json({user})
    
}

const login = async(req, res)=>{
    
    const {username, password} = req.body

    if(!username || !password)
    throw new CustomAPIError(400,"Username and Email Mandatory")

    const user = await User.findOne({username})
    
    if(!user)
    throw new CustomAPIError(400, "Username not exist")

    if(user.password!==password)
    throw new CustomAPIError(400, "Password not match")

    res.status(200).json({user})

}

module.exports = {
    register, login
}
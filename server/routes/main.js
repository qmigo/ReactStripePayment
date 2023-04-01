const { checkout } = require('../controllers/checkout')
const { register, login } = require('../controllers/auth')
const {addToCart, getCart, updateCart, removeFromCart} = require('../controllers/user')
const { addProduct, getAllProducts, getAllUsers } = require('../controllers/admin')

const router = require('express').Router()

// checkout
router.route('/checkout').post(checkout)

// auth
router.route('/auth/register').post(register)
router.route('/auth/login').post(login)

// user
router.route('/addToCart').post(addToCart)
router.route('/getCart').get(getCart)
router.route('/updateCart').patch(updateCart)
router.route('/removeFromCart').delete(removeFromCart)

// admin
router.route('/admin/addProduct').post(addProduct)
router.route('/admin/getAllProducts').get(getAllProducts)
router.route('/admin/getAllUsers').get(getAllUsers)
module.exports = router
// import express
const express = require('express')

// import employeeController
const employeeController = require('./controller/employeeController')

// import product controller
const productController=require('./controller/productController')

// import jwtmiddleware
const jwtMiddleware = require('./middleware/jwtMiddleware')

// import multer
const multerConfig = require('./middleware/multerMiddleware')

// instance router
const router = new express.Router()

// register
router.post('/register',employeeController.register)

// login
router.post('/login',employeeController.login)

//add-products
router.post('/add-products',jwtMiddleware,multerConfig.single('productImage'),productController.addProductController)

// get all products
router.get('/all-products',productController.getAllProductsController)

// get home products
router.get('/home-products',productController.getHomeProductsController)




module.exports = router
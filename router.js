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

const assignWork=require('./controller/workController')
const { checkIn, checkOut, getAttendanceLogs } = require('./controller/attendanceController')

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

// assign-work
router.post('/assign-work',assignWork.assignWorkController)

// get-task
router.get('/getAssignedTasks/:employeeId',assignWork.getAssignedTasks)

// task-completion
router.post('/update-task-status',assignWork.updateWorkController)

// remove task
router.put('/update-task-status',assignWork.updateWorkController)

router.get('/get-all-task-logs',assignWork.getAllTaskLogsController)

// check-in
router.post('/check-in/:employeeID',checkIn)

// check-out
router.post('/check-out/:employeeID',checkOut)

// get attendance logs
router.get('/get-attendance-logs',getAttendanceLogs)



module.exports = router
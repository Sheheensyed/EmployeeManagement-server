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

// const assignWork=require('./controller/workController')

const { checkIn, checkOut, getAttendanceLogs } = require('./controller/attendanceController')
const { assignWorkController, getAssignedTasks, updateTaskStatus, getAllTaskLogsController } = require('./controller/workController')

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
router.post('/assign-work',assignWorkController)

// get-task
router.get('/get-assigned-tasks/:employeeId',getAssignedTasks)

// task-completion
router.post('/update-task-status',updateTaskStatus)

// remove task
// router.put('/update-task-status',assignWork.updateTaskStatus)

router.get('/get-all-task-logs',getAllTaskLogsController)

// check-in
router.post('/check-in/:employeeID',checkIn)

// check-out
router.post('/check-out/:employeeID',checkOut)

// get attendance logs
router.get('/get-attendance-logs',getAttendanceLogs)

// get all employees
router.get('/all-employees', employeeController.getAllEmployees);

// remove employee
router.delete('/delete-employee/:employeeID', employeeController.deleteEmployee);

// edit employee
router.put('/update-employee', employeeController.updateEmployee);



module.exports = router
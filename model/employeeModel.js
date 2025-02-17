// import mongoose
const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeName:{
        required:true,
        type:String
    },
    employeeID:{
        required:true,
        type:String,
        unique:true
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:String
    },
    designation:{
        required:true,
        type:String
    },
    gender:{
        required:true,
        type:String
    }
})

//create model
const employees = mongoose.model('employees', employeeSchema)

// export model
module.exports = employees
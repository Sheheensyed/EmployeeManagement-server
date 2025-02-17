// import mongoose
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        required:true,
        type:String,
        // unique:true
    },
    variant:{
        required:true,
        type:String
    },
    mileage:{
        required:true,
        type:String
    },
    fuelType:{
        required:true,
        type:String
    },
    price:{
        required: true,
        type:String
    },
    productImage:{
        required:true,
        type:String
    }
})

// model
const products= mongoose.model('products',productSchema)

module.exports = products
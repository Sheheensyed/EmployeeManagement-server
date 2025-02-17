// import mongoose
const mongoose = require('mongoose')

connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res) => {
    console.warn(`MongoDB connected successfully`);
}).catch((err) => {
    console.error(`MongoDB connection failed ${err}`);

})
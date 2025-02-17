// import dotenv
require('dotenv').config()

// import connection
require('./connection')

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import router
const router = require('./router')

// create server
const empServer = express()

// server using cors
empServer.use(cors())

// parse the data -> middleware to parse the data
empServer.use(express.json())

// exporting upload folder
empServer.use('/upload',express.static('./uploads'))

// use router
empServer.use(router)

// port 
const PORT = process.env.PORT || 4040

// listen
empServer.listen(PORT, () => {
    console.log(`empServer in running successfully in port number ${PORT}`);
})

// get
empServer.get('/', (req, res) => {
    res.send(`get request recived`)
})
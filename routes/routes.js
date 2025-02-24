const express = require('express');
const router = express.Router();
const twilio = require('twilio')
const jwt = require('jsonwebtoken')
const Employees = require('../model/employeeModel')
require('dotenv').config()


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
const OTPStore = {};

// send OTP
router.post("/send-otp", async (req, res) => {
    const { phone } = req.body;

    try {
        const otp = Math.floor(100000 + Math.random() * 900000)
        OTPStore[phone] = otp

        // send otp via twilio
        await client.messages.create({
            body: `Your otp is ${otp}`,
            from: process.env.TWILIO_PHONE,
            to: phone,
        })
        res.status(200).json({ success: true, message: "OTP sent successffully" })

    } catch (error) {
        res.status(406).json({ success: false, message: "OTP sending failed" })
    }
})

// verify otp and login
router.post('/verify-otp', async (req, res) => {
    const { employeeID, phone, otp } = req.body
    if (OTPStore[phone] && OTPStore[phone] == otp) {
        delete OTPStore[phone];

        let employee = await Employees.findOne({ phone })
        if (!employee){
            return res.status(400).json({success:false,message:"Employee not registered"})
        }

        // generate jwt
        const token = jwt.sign({id:employee._id,phone},process.env.JWT_SECRET,{expiresIn:"1d"});
        
        res.status(200).json({success:true,message:"Login successfull",token})
    }else{
        res.status(406).json({success:false,message:"Invalid OTP"})
    }
})

module.exports= router
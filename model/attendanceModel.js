const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date
    },
    checkOut: {
        type: Date
    },
    duration: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;

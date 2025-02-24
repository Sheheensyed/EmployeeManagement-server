const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true
    },
    work: {
        type: [String], // Array of strings
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'In-Progress'],
        default: 'Pending'
    },
    assignedAt: {
        type: Date,
        default: Date.now
    }
});

const works = mongoose.model('works', workSchema);
module.exports = works;

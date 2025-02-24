// const mongoose = require('mongoose')

// const taskSchema = new mongoose.Schema({

//     title:
//     {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     assignedTo: {
//         type: String,
//         required: true
//     }, // Employee ID
//     status: {
//         type: String,
//         enum: ["pending", "in progress", "completed"],
//         default: "pending"
//     },
//     assignedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// const TaskModel = mongoose.model("Task", taskSchema);
// module.exports = TaskModel;
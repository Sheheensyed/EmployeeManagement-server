const works = require('../model/workModel');

exports.assignWorkController = async (req, res) => {
    console.log('Inside assign-work controller');

    let { employeeID, work } = req.body;
    console.log(`Assigning work for Employee: ${employeeID}`, work);

    try {
        if (!Array.isArray(work) || work.length === 0) {
            return res.status(400).json({ message: "Work list is required and should be an array" });
        }

        // ✅ Define today's start and end time
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        // ✅ Check if work exists for today
        const existingWork = await works.findOne({
            employeeID,
            assignedAt: { $gte: todayStart, $lte: todayEnd }
        });

        if (existingWork) {
            // ✅ Instead of blocking, update the existing task list
            existingWork.work = work;
            existingWork.status = "Pending"; // Reset status if needed
            existingWork.assignedAt = new Date();

            await existingWork.save();

            return res.status(200).json({ message: "Today's tasks updated", updatedWork: existingWork });
        }

        // ✅ If no work exists today, create a new task entry
        const newWork = new works({
            employeeID,
            work,
            status: "Pending",
            assignedAt: new Date()
        });

        await newWork.save();

        res.status(201).json({ message: "New task assigned successfully", work: newWork });
    } catch (error) {
        console.error("Error assigning work:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



// Fetch assigned tasks for a specific employee
exports.getAssignedTasks = async (req, res) => {
    console.log(`Inside get assigned task`);

    try {
        const { employeeId } = req.params;
        console.log(`Fetching task for:`, employeeId);

        if (!employeeId) {
            return res.status(400).json({ message: `Employee ID is required` });
        }

        // ✅ Define today's start and end time
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        console.log("Today's Start Time:", todayStart.toISOString());
        console.log("Today's End Time:", todayEnd.toISOString());

        // ✅ Fetch only today's assigned tasks
        const assignedWork = await works.findOne({
            employeeID: employeeId,
            assignedAt: { $gte: todayStart, $lte: todayEnd }
        });

        console.log(`Assigned Work:`, assignedWork);

        if (!assignedWork) {
            return res.status(202).json({ message: "No tasks assigned today", tasks: [] });
        }

        res.status(200).json({ tasks: assignedWork.work, status: assignedWork.status });
    } catch (error) {
        console.error("Error fetching assigned tasks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// exports.updateTaskStatus = async (req, res) => {
//     const { employeeId, task, status } = req.body;

//     try {
//         if (status === "Completed") {
//             // ✅ Remove the completed task from the database
//             const updatedWork = await works.findOneAndUpdate(
//                 { employeeID: employeeId },
//                 { $pull: { work: task } }, // ✅ $pull removes the task from the array
//                 { new: true }
//             );

//             if (!updatedWork) {
//                 return res.status(404).json({ message: "Task not found" });
//             }

//             return res.status(200).json({ message: "Task completed and removed", updatedWork });
//         } else {
//             // ✅ Just update status if not completed
//             const updatedWork = await works.findOneAndUpdate(
//                 { employeeID: employeeId, "work": task },
//                 { $set: { "status": status } },
//                 { new: true }
//             );

//             if (!updatedWork) {
//                 return res.status(404).json({ message: "Task not found" });
//             }

//             return res.status(200).json({ message: "Task status updated", updatedWork });
//         }
//     } catch (error) {
//         console.error("Error updating task:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

exports.updateTaskStatus = async (req, res) => {
    const { employeeId, task, status } = req.body;
  
    try {
        const updatedWork = await works.findOneAndUpdate(
            { employeeID: employeeId, "work": task }, // Find specific task
            { $set: { "status": status } }, // Update status only
            { new: true }
        );
  
        if (!updatedWork) {
            return res.status(404).json({ message: "Task not found" });
        }

        console.log(`Task "${task}" updated to ${status} for Employee: ${employeeId}`);
  
        res.status(200).json({ message: "Task status updated", updatedWork });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

  
exports.getAllTaskLogsController = async (req, res) => {
    console.log(`Inside getAllTaskLogs`);
    
    try {
        const tasks = await works.find(); // ✅ Fetch all tasks

        if (tasks.length === 0) {
            return res.status(200).json({ message: "No task logs found", tasks: [] });
        }

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching task logs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


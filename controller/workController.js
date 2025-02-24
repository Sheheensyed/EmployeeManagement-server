const works = require('../model/workModel');

exports.assignWorkController = async (req, res) => {
    console.log('Inside assign-work controller');

    let { employeeID, work } = req.body; // Change `task` to `work`
    console.log(employeeID, work);

    try {
        if (!Array.isArray(work)) {
            work = [work]; // Convert single string to an array
        }

        let existingWork = await works.findOne({ employeeID });

        if (existingWork) {
            // Push new tasks to the existing array
            existingWork.work.push(...work);
            await existingWork.save();
            res.status(200).json({ message: `New task(s) assigned to ${employeeID}`, updatedWork: existingWork });
        } else {
            // New employee work assignment
            const newTask = new works({
                employeeID,
                work // Make sure `work` matches the schema
            });
            await newTask.save();
            res.status(200).json({ message: "Work assigned successfully", task: newTask });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch assigned tasks for a specific employee
exports.getAssignedTasks = async (req, res) => {
    console.log(`inside get assigned task`);

    try {
        const { employeeId } = req.params;
        console.log(`Fetching task for:`, employeeId);

        if(!employeeId){
            return res.status(404).json({message:`Employee ID is required`})
        }

        const assignedWork = await works.findOne({ employeeID: employeeId });
        console.log(`Assigned Work:`,assignedWork);


        if (!assignedWork) {
            return res.status(202).json({ message: "No tasks assigned", tasks: [] });
        }

        res.status(202).json({ tasks:assignedWork.work,status:assignedWork.status });
    } catch (error) {
        console.error("Error fetching assigned tasks:", error);
        res.status(404).json({ message: "Internal server error" });
    }
};

exports.updateWorkController=async(req,res)=>{
    console.log(`Inside update work controller`);
    
    try {
        const { employeeID, taskName, status } = req.body;

        if (!employeeID || !taskName || !status) {
            return res.status(400).json({ message: "Employee ID, Task, and Status are required" });
        }

        const task = await works.findOne({ employeeID });

        if (!task) {
            return res.status(404).json({ message: "No tasks found for this employee" });
        }

        // Update only the specific task status
        task.status = status;
        await task.save();

        res.status(200).json({ message: "Task status updated", updatedTask: task });

    } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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


// const works = require("../model/workModel");

// // Fetch assigned tasks for a specific employee
// exports.getAssignedTasks = async (req, res) => {
//     console.log(`inside get assigned task`);

//     try {
//         const { employeeId } = req.params;
//         console.log(`Recieved employeeId:`, employeeId);

//         const tasks = await works.find({ assignedTo: employeeId });
//         console.log(`Task found:`, tasks);


//         if (!tasks.length) {
//             return res.status(200).json({ message: "No tasks assigned", tasks: [] });
//         }

//         res.status(200).json({ tasks });
//     } catch (error) {
//         console.error("Error fetching assigned tasks:", error);
//         res.status(404).json({ message: "Internal server error" });
//     }
// };


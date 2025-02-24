const Attendance = require("../model/attendanceModel");

// Check-in
exports.checkIn = async (req, res) => {
    console.log(`Inside check in`);
    
    const { employeeID } = req.params;

    try {
        const existingAttendance = await Attendance.findOne({ employeeID, date: { $gte: new Date().setHours(0,0,0,0) } });

        if (existingAttendance) {
            return res.status(400).json({ message: "Already checked in today." });
        }

        const newAttendance = new Attendance({ employeeID, checkIn: new Date() });
        await newAttendance.save();

        res.status(200).json({ message: "Check-in successful", attendance: newAttendance });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Check-out
exports.checkOut = async (req, res) => {
    console.log(`Inside check out`);

    const { employeeID } = req.params;

    try {
        const attendance = await Attendance.findOne({ employeeID, checkOut: { $exists: false } });

        if (!attendance) {
            return res.status(400).json({ message: "No active check-in found" });
        }

        attendance.checkOut = new Date();
        const durationMs = attendance.checkOut - attendance.checkIn;
        attendance.duration = `${Math.floor(durationMs / 60000)} mins`;
        await attendance.save();

        res.status(200).json({ message: "Check-out successful", attendance });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch attendance logs
exports.getAttendanceLogs = async (req, res) => {
    console.log(`Inside Attendance logs`);

    try {
        const logs = await Attendance.find().sort({ date: -1 });
        console.log(`Fetched logs:`,logs);
        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// import employee
const employees = require("../model/employeeModel");

// import jwt
const jwt = require('jsonwebtoken')

// import bcrypt
const bcrypt = require('bcrypt');

// register
exports.register = async (req, res) => {
    console.log('inside register function');
    const { employeeName, employeeID, email, password, designation, gender, phone } = req.body
    console.log(employeeName, employeeID, email, password, designation, gender, phone);

    try {
        const existingEmployee = await employees.findOne({ employeeID })
        if (existingEmployee) {
            res.status(406).json({ message: `Employee already exist` })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newEmployee = new employees({
                employeeName,
                employeeID,
                email,
                phone,
                password: hashedPassword,
                designation,
                gender,
                // password,
            })
            newEmployee.save()
            await res.status(200).json(newEmployee)
        }

    } catch (error) {
        res.status(401).json(error)
    }
}


// login
exports.login = async (req, res) => {
    console.log('inside login function');
    const { employeeID, password } = req.body
    console.log(employeeID, password);

    try {
        const existingEmployee = await employees.findOne({ employeeID })

        if (existingEmployee) {
            let isUserPasswordMatch = await bcrypt.compare(password, existingEmployee.password)

            if (isUserPasswordMatch || password == existingEmployee.password) {

                const token = jwt.sign({ empID: existingEmployee._id }, "okBye")
                res.status(200).json({ existingEmployee, token })
            } else {
                res.status(406).json('Incorrect ID or password')
            }

        } else {
            res.status(406).json('Incorrect ID or password')
        }
    } catch (error) {
        res.status(401).json(error)
    }

}

// get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const AllEmployees = await employees.find();
        if (AllEmployees.length > 0) {
            res.status(202).json(AllEmployees);
        } else {
            res.status(202).json({ message: "No employees found" });
        }
    } catch (error) {
        res.status(404).json({ message:error.message });
    }
};

// remove employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { employeeID } = req.params; // Get employee ID from URL
        console.log(`Deleting employee: ${employeeID}`);

        const deletedEmployee = await employees.findOneAndDelete({ employeeID });

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// edit employee
exports.updateEmployee = async (req, res) => {
    try {
        const { employeeID, employeeName, email, phone, designation, gender } = req.body;

        if (!employeeID) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        const updatedEmployee = await employees.findOneAndUpdate(
            { employeeID },
            { employeeName, email, phone, designation, gender },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { employeeID, employeeName, email, phone, designation, gender } = req.body;

        if (!employeeID) {
            return res.status(400).json({ message: "Employee ID is required" });
        }

        const updatedEmployee = await employees.findOneAndUpdate(
            { employeeID },
            { employeeName, email, phone, designation, gender },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", updatedEmployee });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// 🔹 Delete Employee API
exports.deleteEmployee = async (req, res) => {
    try {
        const { employeeID } = req.params;
        const deletedEmployee = await employees.findOneAndDelete({ employeeID });

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee removed successfully" });
    } catch (error) {
        console.error("Error removing employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// import employee
const employees = require("../model/employeeModel");

// import jwt
const jwt = require('jsonwebtoken')

// import bcrypt
const bcrypt = require('bcrypt')

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
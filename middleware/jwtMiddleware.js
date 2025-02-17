// import jwt
const jwt = require('jsonwebtoken')
const jwtMiddleware = (req, res, next) => {
    // logic
    console.log(`Inside jwtMiddleware`);
    const token = req.headers[`authorization`].split(" ")[1]
    console.log(token);

    try {
        const jwtResponse = jwt.verify(token,"okBye")
        console.log(jwtResponse);
        req.payload = jwtResponse.empId
        next()
        
    } catch (error) {
        res.status(401).json(`Authorization failed due to ${error}`)
    }


}

module.exports = jwtMiddleware
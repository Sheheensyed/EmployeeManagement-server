// // import jwt
// const jwt = require('jsonwebtoken')
// const jwtMiddleware = (req, res, next) => {
//     // logic
//     console.log(`Inside jwtMiddleware`);
//     const token = req.headers[`authorization`].split(" ")[1]
//     console.log(token);

//     try {
//         const jwtResponse = jwt.verify(token,"okBye")
//         console.log(jwtResponse);
//         req.payload = jwtResponse.empId
//         next()
        
//     } catch (error) {
//         res.status(401).json(`Authorization failed due to ${error}`)
//     }


// }

// module.exports = jwtMiddleware


// import jwt
const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log(`Inside jwtMiddleware`);

    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        console.log("Extracted Token:", token);

        const jwtResponse = jwt.verify(token, "okBye");
        console.log("Decoded Token:", jwtResponse);

        req.payload = jwtResponse;
        next();
        
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ message: `Authorization failed: ${error.message}` });
    }
};

module.exports = jwtMiddleware;

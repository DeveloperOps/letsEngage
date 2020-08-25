const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const authMid = (req , res , next) => {
    let token = req.header('x-auth-token');
    if(!token) {
        return res.status(400).send({ error: "Invalid user!!" });
    }
    try {
        let decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error) {
        console.log(error);
        return res.status(400).send({ error: "Server error!!" });
    }
};

module.exports = authMid;
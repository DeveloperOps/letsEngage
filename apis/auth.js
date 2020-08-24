const express = require('express'); 
const route = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const mongooose = require('mongoose');
const User = require('../modals/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

route.post('/' , async(req , res) => {
    try {
        const {username , password} = req.body;
        let existUser  = await User.find({ socialusername: username });
        if(existUser.length == 0) return res.status(400).send({ error: 'Invalid User Credentials!!' });
        const validatepassword = await bcrypt.compare(password , existUser[0].password);
        if(!validatepassword)  return res.status(400).send({ error: 'Invalid User Credentials!!' });
        let token = jwt.sign({ _id: existUser[0]._id} , process.env.JWT_SECRET);
        return res.header('x-auth-token' , token).send(token);
    } catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
});

module.exports = route;
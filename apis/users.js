const express = require('express'); 
const route = express.Router();
const joi = require('joi');
const bcrypt = require('bcrypt');
const mongooose = require('mongoose');
const User = require('../modals/User');

route.post('/' , async(req , res) => {
    const {email , socialusername , password} = req.body; 
    try {
        let {error} = validateUserData(req.body);
        if(error) return res.status(400).send({ error: error });
        let existUser  = await User.find({ email: email });
        if(existUser.length == 1) return res.status(400).send({ error: 'User already exists' });
        let user;
        user  = new User({
            email: email,
            socialusername: socialusername,
            password: password
        }); 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);
        const result = await user.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({ error: 'Server issue' });
    }
}); 

module.exports = route;
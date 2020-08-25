const express = require('express'); 
const route = express.Router();
const bcrypt = require('bcrypt');
const mongooose = require('mongoose');
const Group = require('../modals/Group');
const authmiddleware = require('../middlewares/authMiddle'); 
//get all groups
route.get('/' , authmiddleware , async(req , res) => {
    try {
        let groups = await Group.find();
        res.send(groups);
    } catch (error) {
        return res.status(400).send({error: "server issue!!"});
    }
});

module.exports = route;
const express = require('express'); 
const route = express.Router();
const bcrypt = require('bcrypt');
const mongooose = require('mongoose');
const Group = require('../modals/Group');
const Message = require('../modals/Message');
const authmiddleware = require('../middlewares/authMiddle'); 
const User = require('../modals/User');

//post a message
route.post('/' , authmiddleware , async(req , res) => {
    try {
        const { message } = req.body;
        let newMessage = new Message({message: message});
        const result = await newMessage.save();
        let user = await User.find({ _id: req.user._id });
        let group = await Group.find({ _id: user[0].groupId });
        let updatedMsgArr = group[0].groupMsgs;
        updatedMsgArr.push(result._id);
        let updatedGroup = await Group.findOneAndUpdate({ _id: group[0]._id }, { groupMsgs: updatedMsgArr});
        return res.send(true);
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: "Server Issue!!" });
    }    
});

//get messages
route.get('/' , authmiddleware , async(req , res) => {
    try {
        let user = await User.find({ _id: req.user._id });
        let group = await Group.find({ _id: user[0].groupId });
        let messages = group[0].groupMsgs;
        var allMessages = [];
        var lengthOfMessages = messages.length;
        messages.forEach(async element => {
                let oneMessage = await Message.find({_id: element });
                allMessages.push(oneMessage[0])
                lengthOfMessages--;
                if(lengthOfMessages == 0) {
                    res.send(allMessages);
                }
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: "Server Issue!!" });
    }
});

module.exports = route;
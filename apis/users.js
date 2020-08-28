const express = require('express'); 
const route = express.Router();
const bcrypt = require('bcrypt');
const mongooose = require('mongoose');
const User = require('../modals/User');
const Group = require('../modals/Group');
const authmiddleware = require('../middlewares/authMiddle'); 
//register a user
route.post('/' , async(req , res) => {
    const {email , socialusername , password} = req.body; 
    try {
        
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
//post create group
route.post('/create' , authmiddleware ,  async(req , res) => {
    try {
        const { name , platform } = req.body;
        let group = new Group({
            groupName: name,
            groupPlatform: platform,
            groupAdmin: req.user._id,
         });
        const savedGroup = await group.save();
        let currentUser;
        if(savedGroup) {
            currentUser = await User.findOneAndUpdate({ _id: req.user._id } , { isGroupAdmin: true , groupId: savedGroup._id });
        }
        res.send(savedGroup);
    } catch (error) { 
        console.log(error);
        return res.status(400).send(error);
    }
});
//post join group
route.post('/join/:id' , authmiddleware ,  async(req , res) => {
    try {
        const groupId = req.params.id;
        const userId = req.user._id;
        const letGroup = await Group.find({ _id: groupId });
        if(letGroup.length === 0) return res.status(400).send({error: "Invalid Group!!"});
        let updatedMemberArray = letGroup[0].groupMembers;
        updatedMemberArray.push(userId);
        const updateGroup = await Group.findOneAndUpdate({ _id: groupId } , { groupMembers: updatedMemberArray });
        if(updateGroup) {
            await User.findByIdAndUpdate({ _id: userId } , { groupId: groupId });
            res.send({  join: true });
        }
    } catch (error) { 
        console.log(error.message);
        return res.status(400).send({error: "server issue!!"});
    }
});
//get current user
route.get('/' , authmiddleware ,async(req , res) => {
    try {
        res.send(await User.find({ _id: req.user._id }));
    } catch (error) {
        return res.status(400).send({error: "server issue!!"});
    }
});

module.exports = route; 
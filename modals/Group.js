const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        unique: true
    },
    groupPlatform: { 
        type: String
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    groupMembers: [{
            type: mongoose.Schema.Types.ObjectId,
        }],
    groupMsgs: [{
        type: mongoose.Schema.Types.ObjectId,
    }]
});

module.exports = Group = mongoose.model('group' , groupSchema);
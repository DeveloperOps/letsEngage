const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,  
    },
    socialusername: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    isGroupAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('user' , userSchema);
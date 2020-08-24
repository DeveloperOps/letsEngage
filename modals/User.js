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
    }
});

module.exports = User = mongoose.model('user' , userSchema);
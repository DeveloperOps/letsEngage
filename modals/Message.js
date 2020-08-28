const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({ 
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = Message = mongoose.model('message', messageSchema);
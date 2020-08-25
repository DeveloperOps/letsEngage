const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectionString = process.env.MONGO_SRV;
const mongoConnect = () => {
    mongoose.connect(connectionString , {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log('connected')
    }).catch(err => {
        console.log(err.message)  
    });
} 
  
module.exports = mongoConnect;
const express = require('express');
const app = express();
const mongoDB = require('./config/db');

//routes
const users = require('./apis/users'); 
const auth = require('./apis/auth'); 
const groups = require('./apis/groups'); 
const messages = require('./apis/messages')

app.use(express.json());
//db connection
mongoDB();
//login signup
app.use('/api/user/', users); 
app.use('/api/auth/', auth);  
app.use('/api/groups', groups);
app.use('/api/message' , messages);

app.listen(4000 , () => {
    console.log('server running ' + 4000);
})

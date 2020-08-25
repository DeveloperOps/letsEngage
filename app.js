const express = require('express');
const app = express();
const mongoDB = require('./config/db');

//routes
const users = require('./apis/users'); 
const auth = require('./apis/auth'); 

app.use(express.json());

//db connection
mongoDB();
//login signup
app.use('/api/user/', users); 
app.use('/api/auth/', auth);  

//choose an option (create a group / join an existing group )

//create a group (--->) {req.body} groupname: new Group Name , created-by: userid , date: date , platform: instagram , twitter etc. 

//mygroup if(created)- if(joined)
app.listen(4000 , () => {
    console.log('server running ' + 4000);
})

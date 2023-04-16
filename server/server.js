// Required dependencies to get with npm install: 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// identify the PORT on which server can be booted
const PORT = 5000; 

// Router & Route(s): 
const taskRouter = require('./routes/task.router.js');
const userRouter = require('./routes/user.router.js');
app.use('/task-list', taskRouter);
app.use('/user', userRouter);

// PORT listening for requests
app.listen(PORT, () => {
    console.log('listening on PORT:', PORT);
});
// Visit https://httpstatuses.com/ for a list of http status codes.

const express = require('express');
require('./db/mongoose');   // for connection to database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT;

app.use(express.json());    //parses incoming JSON requests as JS objects.
app.use(userRouter);
app.use(taskRouter); 

app.get('/', (req, res) => {
   res.send(<h3>"Hi there! Please use the site from a API developement tool like Postman."</h3>); 
});

app.listen(port, () => {
    console.log('Server is up on the port ' + port);
});


const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actors');
const users = require('./routers/users');
const auth = require('./routers/auth');
const movies = require('./routers/movies');
const config = require('config');
const jwt = require('jsonwebtoken');
const app = express();


mongoose.connect('mongodb://localhost/backend-task',{
    useNewUrlParser: true,
    useCreateIndex: true
})
 .then(()=>console.log('Connected to the MongoDB......'))
 .catch(err=>console.log('Could Not Connect to The MongoDB', err))


//  if (!config.get('jwtPrivateKey')){
//     console.log('FATAL ERROR: token is not define, please export like this....... export task_jwtPrivateKey=anyKey')
//     process.exit(1)
//   };

app.use(express.json());
app.use('/api/actors', actors);
app.use('/api/user/signup', users);
app.use('/api/user/login', auth);
app.use('/api/movies', movies);


const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on the ...${port}....`));
 
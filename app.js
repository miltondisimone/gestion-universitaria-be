// Requires
const express = require('express');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');


//Init variables
const app = express();

// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const appRoute = require('./routes/app.route');
const userRoute = require('./routes/user.route');
const loginRoute = require('./routes/login.route');



// DB Conecction
moongoose.connection.openUri('mongodb://localhost:27017/gestionUniversitariaDB', (err, res) => {
    if (err) throw err;

    console.log('Database \x1b[32m%s\x1b[0m', 'online');
});


//Routes

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/', appRoute);



// Listen requests
app.listen(3000, () => {
    console.log('Express Server run into port 3000: \x1b[32m%s\x1b[0m', 'online');
});
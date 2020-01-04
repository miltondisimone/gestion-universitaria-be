// Requires
const express = require('express');
const moongoose = require('mongoose');
const bodyParser = require('body-parser');


//Init variables
const app = express();


// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import routes
const appRoute = require('./routes/app.route');
const loginRoute = require('./routes/login.route');
const userRoute = require('./routes/user.route');
const subjectRoute = require('./routes/subject.route');
const studentRoute = require('./routes/student.route');



// DB Conecction
moongoose.connection.openUri('mongodb://localhost:27017/gestionUniversitariaDB', (err, res) => {
    if (err) throw err;

    console.log('Database \x1b[32m%s\x1b[0m', 'online');
});


//Routes

app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/subject', subjectRoute);
app.use('/student', studentRoute);
app.use('/', appRoute);



// Listen requests
app.listen(3000, () => {
    console.log('Express Server run into port 3000: \x1b[32m%s\x1b[0m', 'online');
});
const express = require('express');

const app = express();

const loginController = require('../controllers/login.controller');

//Rutas
app.post('/', loginController.login);

module.exports = app;
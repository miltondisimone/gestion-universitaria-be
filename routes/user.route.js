const express = require('express');

const app = express();

const userController = require('../controllers/user.controller');

//Rutas
app.get('/', userController.getAllUsers);

module.exports = app;
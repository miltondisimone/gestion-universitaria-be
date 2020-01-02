const express = require('express');

const app = express();

const userController = require('../controllers/user.controller');

//Rutas
app.get('/', userController.getAllUsers);
app.post('/', userController.createUser);
app.put('/:id', userController.updateUser);
app.delete('/:id', userController.deleteUser);

module.exports = app;
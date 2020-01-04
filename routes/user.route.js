const express = require('express');

const app = express();
const mdAuthentication = require('../middlewares/authentication.middleware');

const userController = require('../controllers/user.controller');

//Rutas
app.get('/', userController.getAllUsers);
app.post('/', userController.createUser);
app.put('/:id', mdAuthentication.tokenVerify, userController.updateUser);
app.delete('/:id', [mdAuthentication.tokenVerify, mdAuthentication.adminVerify], userController.deleteUser);

module.exports = app;
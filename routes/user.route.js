const express = require('express');

const app = express();

const fileUpload = require('express-fileupload');
const mdAuthentication = require('../middlewares/authentication.middleware');

const userController = require('../controllers/user.controller');

// default options
app.use(fileUpload());

//Rutas
app.get('/', userController.getAllUsers);
app.post('/', userController.createUser);
app.put('/:id', mdAuthentication.tokenVerify, userController.updateUser);
app.put('/upload/:id', userController.uploadUser);
app.delete('/:id', [mdAuthentication.tokenVerify, mdAuthentication.adminVerify], userController.deleteUser);

module.exports = app;
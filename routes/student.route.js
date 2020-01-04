const express = require('express');

const app = express();

const StudentController = require('../controllers/student.controller');

//Rutas
app.get('/', StudentController.getAllStudents);
app.post('/', StudentController.createStudent);
app.delete('/:id', StudentController.deleteStudent);

module.exports = app;
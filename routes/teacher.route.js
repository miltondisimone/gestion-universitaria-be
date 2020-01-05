const express = require('express');

const app = express();

const TeacherController = require('../controllers/teacher.controller');

//Rutas
app.get('/', TeacherController.getAllTeacher);
app.post('/', TeacherController.createTeacher);
app.put('/:id', TeacherController.updateTeacher);
app.delete('/:id', TeacherController.deleteTeacher);

module.exports = app;
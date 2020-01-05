const Student = require('../models/student.model');
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

exports.getAllStudents = (req, res) => {

    Student.find({})
        .populate('user', 'name email')
        .exec((err, students) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    message: 'error',
                    errors: 'err',
                });
            }

            res.status(200).json({
                ok: true,
                message: 'Success',
                students
            });

        });


};

exports.createStudent = (req, res) => {

    body = req.body;

    const student = new Student({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    student.save((err, savedStudent) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error creating student',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Student created successfully',
            savedStudent
        });


    });

};

exports.updateStudent = (req, res) => {

    const id = req.params.id;
    const body = req.body;

    Student.findByIdAndUpdate(id, body, { new: true }, (err, updatedStudent) => {

        if (err) {
            res.status(400).json({
                ok: false,
                message: 'There is no Student with that ID',
                errors: err,
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Student Updated',
            updatedStudent
        });

    });

};

exports.deleteStudent = (req, res) => {

    const id = req.params.id;

    Student.findByIdAndDelete(id, (err, deletedStudent) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error when try to find Student',
                errors: err,
            });
        }

        if (!deletedStudent) {
            res.status(400).json({
                ok: false,
                message: 'There is no Student with that ID',
                errors: err,
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Student successfully deleted',
            deletedStudent
        });


    });

};
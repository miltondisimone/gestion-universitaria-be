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

    const user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save((err, savedUser) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error creating user',
                errors: err
            });
        }

        const student = new Student({ user: savedUser.id });

        student.save((err, savedStudent) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    message: 'error',
                    errors: err,
                });
            }

            res.status(200).json({
                ok: true,
                message: 'Student created successfully',
                savedStudent
            });
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

        User.findByIdAndDelete(deletedStudent.user, (err, deletedUser) => {

            deletedUser.password = '';

            if (err) {
                res.status(500).json({
                    ok: false,
                    message: 'Error when try to find User',
                    errors: err,
                });
            }

            if (!deletedUser) {
                res.status(400).json({
                    ok: false,
                    message: 'There is no Users with that ID',
                    errors: err,
                });
            }

            res.status(200).json({
                ok: true,
                message: 'Student successfully deleted',
                deletedUser
            });

        });



    });

};
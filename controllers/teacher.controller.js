const Teacher = require('../models/teacher.model');

const bcrypt = require('bcryptjs');

exports.getAllTeacher = (req, res) => {

    Teacher.find({}, (err, teachers) => {

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
            teachers
        });

    });


};

exports.createTeacher = (req, res) => {

    body = req.body;

    const teacher = new Teacher({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    teacher.save((err, savedTeacher) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error creating teacher',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Teacher created successfully',
            savedTeacher
        });


    });

};

exports.updateTeacher = (req, res) => {

    const id = req.params.id;
    const body = req.body;

    Teacher.findByIdAndUpdate(id, body, { new: true }, (err, updatedTeacher) => {

        if (err) {
            res.status(400).json({
                ok: false,
                message: 'There is no Teacher with that ID',
                errors: err,
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Teacher Updated',
            updatedTeacher
        });

    });

};

exports.deleteTeacher = (req, res) => {

    const id = req.params.id;

    Teacher.findByIdAndDelete(id, (err, deletedTeacher) => {

        if (err) {
            res.status(500).json({
                ok: false,
                message: 'Error when try to find Teacher',
                errors: err,
            });
        }

        if (!deletedTeacher) {
            res.status(400).json({
                ok: false,
                message: 'There is no Teacher with that ID',
                errors: err,
            });
        }

        res.status(200).json({
            ok: true,
            message: 'Teacher successfully deleted',
            deletedTeacher
        });


    });

};
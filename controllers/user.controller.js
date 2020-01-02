const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


exports.getAllUsers = (req, res, next) => {

    User.find({}, (err, users) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error to search Users.'
            });
        }

        res.status(200).json({
            ok: true,
            message: 'OK',
            users
        });
    });

};

exports.createUser = (req, res) => {

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

        res.status(201).json({
            ok: true,
            message: 'User created successfully',
            savedUser
        });

    });

};

exports.updateUser = (req, res) => {
    var id = req.params.id;
    var body = req.body;

    User.findById(id, (err, dbUser) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error updating user',
                errors: err
            });
        }

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                message: 'There is no user with that ID'
            });
        }

        dbUser.name = body.name;
        dbUser.email = body.email;
        dbUser.role = body.role;

        dbUser.save((err, savedUser) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error saving user',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                message: 'User updated successfully',
                savedUser
            });
        });

    });
};

exports.deleteUser = (req, res) => {

    const id = req.params.id;

    User.findByIdAndDelete(id, (err, deletedUser) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error finding and deleting user',
                errors: err
            });
        }

        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                message: 'There is no user with that ID',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            message: 'User deleted successfully',
            deletedUser
        });

    });
};
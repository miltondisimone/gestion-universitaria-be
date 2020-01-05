const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const fs = require('fs');


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

    const id = req.params.id;
    const body = req.body;

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

exports.uploadUser = (req, res) => {

    const id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No seleccione ningun archivo',
            errors: { message: 'Seleccione una imagen' },
        });
    }

    // Obtener nombre del archivo
    const file = req.files.image;
    const cutName = file.name.split('.');
    const fileExtension = cutName[cutName.length - 1];

    // Extensiones validas
    const validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

    if (validExtensions.indexOf(fileExtension) < 0) {

        return res.status(400).json({
            ok: false,
            mensaje: 'Invalid extension',
            errors: { message: 'Valid extensions: ' + validExtensions.join(', ') }
        });

    }

    // Custom file name
    const fileName = `${id}-${new Date().getMilliseconds()}.${fileExtension}`;

    // Mover el archivo a un path
    const path = `./upload/user/${fileName}`;

    file.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error moving file',
                errors: err
            });
        }

        User.findById(id, (err, user) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error findin users',
                    errors: err
                });
            }

            if (!user) {
                return res.status(422).json({
                    ok: false,
                    mensaje: 'There is no Users with that ID',
                    errors: err
                });
            }

            const oldPath = './upload/user/' + user.img;

            // Delete old image if exists
            if (fs.existsSync(oldPath)) {
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            message: 'Error deleting old image',
                            errors: err,
                        });
                    }
                });
            }

            user.img = fileName;

            user.save((err, updatedUser) => {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'User image updated',
                    updatedUser
                });
            });
        });
    });

};
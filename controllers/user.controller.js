const User = require('../models/user.model');


exports.getAllUsers = (req, res, next) => {

    User.find({}, (err, users) => {

        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: 'Error to search Users.'
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'OK',
            users
        });
    });

};
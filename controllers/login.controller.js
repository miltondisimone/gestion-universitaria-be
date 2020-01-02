const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SEED = require('../config/config').SEED;

exports.login = (req, res) => {

    const body = req.body;

    User.findOne({ email: body.email }, (err, dbUser) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                message: 'Wrong credentials - Email',
                errors: err
            });
        }

        if (!(bcrypt.compareSync(body.password, dbUser.password))) {
            return res.status(400).json({
                ok: false,
                message: 'Wrong credentials - Password',
                errors: err
            });
        }

        // Create token
        dbUser.password = '';
        const token = jwt.sign({ user: dbUser }, SEED, { expiresIn: 14400 });

        res.status(200).json({
            ok: true,
            token: token,
            user: dbUser,
            id: dbUser.id
        });

    });

};
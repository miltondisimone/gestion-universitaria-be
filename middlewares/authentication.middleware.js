const jwt = require('jsonwebtoken');

const SEED = require('../config/config').SEED;


// ===============================
//	Token verify
// ===============================
exports.tokenVerify = (req, res, next) => {

    const token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token unauthorized',
                errors: err
            });
        }

        req.user = decoded.user;

        next();

    });

};

exports.adminVerify = (req, res, next) => {
    if (req.user.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            mensaje: 'Unauthorized',
        });
    }
    next();
};
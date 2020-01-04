const express = require('express');

const app = express();

//Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Successful request'
    });

});

module.exports = app;
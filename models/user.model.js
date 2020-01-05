const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const validRols = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valida rol'
};

const userOptions = {
    discriminatorKey: 'usertype',
    collection: 'users',
};

const userSchema = new Schema({

    name: { type: String, required: [true, 'Name is required'] },
    email: { type: String, unique: true, required: [true, 'El email es necesario'] },
    password: { type: String, required: [true, 'La constraseña es necesaria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: validRols },
    google: { type: Boolean, default: false }

}, userOptions);

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('User', userSchema);
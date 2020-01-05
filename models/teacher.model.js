const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UniqueValidator = require('mongoose-unique-validator');

const User = require('../models/user.model');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({

    subject: { type: [Schema.Types.ObjectId], ref: 'Subject' },
    course: { type: [Schema.Types.ObjectId], ref: 'Course' }

});

module.exports = User.discriminator('Teacher', teacherSchema);
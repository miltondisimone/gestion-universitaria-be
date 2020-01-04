const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const UniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const studentSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    file: { type: Number, default: 0, required: true, unique: true },
    career: { type: [Schema.Types.ObjectId], ref: 'Career' },
    subject: { type: [Schema.Types.ObjectId], ref: 'Subject' }

});

studentSchema.plugin(AutoIncrement, { inc_field: 'file' });
studentSchema.plugin(UniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Student', studentSchema);
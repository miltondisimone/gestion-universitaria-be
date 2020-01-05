const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({

    subject: { type: Schema.Types.ObjectId, ref: 'Subject' },
    grade: { type: Number },
    division: { type: Number }

});

module.exports = mongoose.model('Course', courseSchema);
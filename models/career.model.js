const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const careerSchema = new Schema({

    name: { type: String, unique: true, required: true },
    subject: { type: [Schema.Types.ObjectId], ref: 'Subject' }

});


careerSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('Career', careerSchema);
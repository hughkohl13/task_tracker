const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);
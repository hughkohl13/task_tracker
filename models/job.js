const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    role: {
        type: String
    },
    description: {
        type: String
    },
    company: {
        type: String
    },
    url: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now 
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Job', jobSchema);
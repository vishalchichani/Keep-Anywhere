const mongoose = require('mongoose');

const notesSchema = {
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: "General"
    },
    timestamp: {
        type: Date,
        default: Date.now
    },

}

module.exports = mongoose.model('notes', notesSchema);
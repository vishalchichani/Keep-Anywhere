const mongoose = require('mongoose');
const {Schema} = mongoose;
const notesSchema = {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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
const mongoose = require('mongoose');

const timeEntrySchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    approved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('TimeEntry', timeEntrySchema);

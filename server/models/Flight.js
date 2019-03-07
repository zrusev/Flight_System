const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    id: {
        type: string
    },
    flightName: {
        type: String
    },
    flightDirection: {
        type: String,
        enum: ['A', 'D']
    },
    flightNumber: {
        type: integer
    },
    gate: {
        type: String
    },
    scheduleDate: {
        type: String
    },
    scheduleTime: {
        type: String
    },
    terminal: {
        type: integer
    }
});

module.exports = mongoose.model('Flight', flightSchema);
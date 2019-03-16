const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightId: {
        type: Schema.Types.String,
        required: true
    },
    flightName: {
        type: Schema.Types.String,
        required: true
    },
    reservedSeats: [{
        type: Schema.Types.String,
        required: true
    }]
});

module.exports = mongoose.model('Flight', flightSchema);
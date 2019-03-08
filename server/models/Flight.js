const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    id: {
        type: Schema.Types.String, 
        required: true
    }
});

module.exports = mongoose.model('Flight', flightSchema);
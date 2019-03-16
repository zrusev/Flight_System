const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  flight: {
    type: Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barcode: {
      type: Schema.Types.String
  },
  seats: [{
    type: Schema.Types.String,
    required: true
  }]
});

module.exports = mongoose.model('Ticket', ticketSchema);
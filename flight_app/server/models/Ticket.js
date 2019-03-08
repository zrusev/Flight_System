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
  price: {
    type: Number,
    required: true
  },
  barcode: {
      type: Schema.Types.String
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
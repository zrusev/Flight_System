const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true      
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  flight: {
    type: Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
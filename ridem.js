const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  pickupPoint: {
    type: String,
    required: true,
  },
  dropOffPoint: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bookingId:{
    type:Number,
    required:true
  },

  user:{
    type:{},
    ref:'User'
  }
});

// Create the "rides" collection in the database using the rideSchema
const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;

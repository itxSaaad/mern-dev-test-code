const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  maxPictures: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Car', carSchema);

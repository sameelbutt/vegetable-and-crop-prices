const mongoose = require('mongoose');

const vegetablePriceSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,

  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  city: {
    type: String,
    enum: ['Lahore', 'Fasilabad', 'PakPatan'],
    required: true
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});


const VegetablePrice = mongoose.model('VegetablePrice', vegetablePriceSchema);

module.exports = VegetablePrice;

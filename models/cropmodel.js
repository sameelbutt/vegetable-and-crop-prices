const mongoose = require('mongoose');

// Define the schema for vegetable prices
const cropPriceSchema = new mongoose.Schema({
  serialNumber: {
    type: Number,

  },
  name: {
    type: String,
    // required: true,
    trim: true
  },
  
  description: {
    type: String,
    // required: true,
    trim: true
  },
  price: {
    type: Number,
    // required: true
  },
  city: {
    type: String,
    enum: ['Lahore', 'Fasilabad', 'PakPatan'],
    // required: true
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});

// Create a model from the schema
const CropPrice = mongoose.model('CropPrice', cropPriceSchema);

module.exports = CropPrice;

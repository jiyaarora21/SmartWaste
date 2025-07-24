const mongoose = require('mongoose');

const WasteRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  typeOfWaste: {
    type: String,
    enum: ['Plastic', 'Organic', 'E-waste', 'Other'],
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // other values: 'Completed'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('WasteRequest', WasteRequestSchema);

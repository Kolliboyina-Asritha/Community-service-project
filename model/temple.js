
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const templeDonorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[A-Za-z\s]{3,100}$/
  },
  phoneno: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
    trim: true
  },
  donationAmount: {
    type: String,
    required: true,
    trim: true
  },
  oldPhoto: {
    type: String, // store filename or full URL
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TempleDonor', templeDonorSchema);

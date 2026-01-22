const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const bloodDonorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z\s]{3,50}$/,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{10}$/,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  bloodgroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  condition: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BloodDonor', bloodDonorSchema);

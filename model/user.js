const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    match: /^[A-Za-z\s]{3,50}$/,
    trim: true
  },
  mobileno: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

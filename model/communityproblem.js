const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const localIssueSchema = new Schema({
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
  problem: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LocalIssue', localIssueSchema);

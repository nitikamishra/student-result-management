const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  subject1: {
    type: Number,
    required: true
  },
  subject2: {
    type: Number,
    required: true
  },
  subject3: {
    type: Number,
    required: true
  },
  subject4: {
    type: Number,
    required: true
  },
  subject5: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);

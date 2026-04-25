const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Basic Info (Teacher bharta hai)
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  subject1: { type: Number, default: 0 },
  subject2: { type: Number, default: 0 },
  subject3: { type: Number, default: 0 },
  subject4: { type: Number, default: 0 },
  subject5: { type: Number, default: 0 },

  // Personal Info (Student bharta hai)
  gender: { type: String },
  dob: { type: String },
  bloodGroup: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },

  // Parent Info
  parentName: { type: String },
  parentPhone: { type: String },
  parentEmail: { type: String },

  // Photo
  photo: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);
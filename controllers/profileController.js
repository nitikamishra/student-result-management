const Student = require('../models/Student');

// Student apni profile update kare
exports.updateProfile = async (req, res) => {
  try {
    const {
      gender, dob, bloodGroup,
      phone, email, address,
      parentName, parentPhone, parentEmail
    } = req.body;

    const updateData = {
      gender, dob, bloodGroup,
      phone, email, address,
      parentName, parentPhone, parentEmail
    };

    // Agar photo upload hua hai
    if (req.file) {
      updateData.photo = `/uploads/${req.file.filename}`;
    }

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Profile updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student ki profile dekho
exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const Student = require('../models/Student');

// Grade calculate karne ka logic
const calculateGrade = (percentage) => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  return 'F';
};

// Sabhi students lao
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Naya student add karo
exports.addStudent = async (req, res) => {
  try {
    const { name, rollNumber, subject1, subject2, subject3, subject4, subject5 } = req.body;
    const total = subject1 + subject2 + subject3 + subject4 + subject5;
    const percentage = (total / 500) * 100;
    const grade = calculateGrade(percentage);
    const result = percentage >= 40 ? 'Pass' : 'Fail';

    const student = new Student({
      name, rollNumber,
      subject1, subject2, subject3,
      subject4, subject5
    });

    await student.save();
    res.status(201).json({ student, percentage, grade, result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Student delete karo
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

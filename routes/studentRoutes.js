const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  deleteStudent,
  updateStudent
} = require('../controllers/studentController');
const protect = require('../middleware/auth');

router.get('/', protect, getAllStudents);
router.post('/', protect, addStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;
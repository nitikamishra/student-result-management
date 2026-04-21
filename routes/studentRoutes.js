const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  deleteStudent
} = require('../controllers/studentController');
const protect = require('../middleware/auth');

router.get('/', protect, getAllStudents);
router.post('/', protect, addStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  addStudent,
  deleteStudent
} = require('../controllers/studentController');

router.get('/', getAllStudents);
router.post('/', addStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
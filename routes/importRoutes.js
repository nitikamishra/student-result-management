const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { importStudents } = require('../controllers/importController');
const protect = require('../middleware/auth');

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, true);
    } else {
      cb(new Error('Sirf .xlsx file allowed hai!'));
    }
  }
});

router.post('/', protect, upload.single('file'), importStudents);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { updateProfile, getProfile } = require('../controllers/profileController');
const protect = require('../middleware/auth');

// Photo upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'photo_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Sirf JPG/PNG allowed hai!'));
    }
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB max
});

router.get('/:id', protect, getProfile);
router.put('/:id', protect, upload.single('photo'), updateProfile);

module.exports = router;
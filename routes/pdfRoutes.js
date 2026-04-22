const express = require('express');
const router = express.Router();
const { generateResultCard } = require('../controllers/pdfController');
const protect = require('../middleware/auth');

router.get('/:id', protect, generateResultCard);

module.exports = router;

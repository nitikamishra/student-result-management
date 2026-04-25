const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const importRoutes = require('./routes/importRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Uploads folder publicly accessible karo (photos ke liye)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/import', importRoutes);
app.use('/api/result', pdfRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
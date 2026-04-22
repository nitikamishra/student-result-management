const xlsx = require('xlsx');
const Student = require('../models/Student');

exports.importStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Excel file read karo
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      return res.status(400).json({ message: 'Excel file empty hai' });
    }

    // Har row ko student ki tarah save karo
    let added = 0;
    let skipped = 0;

    for (const row of data) {
      try {
        const student = new Student({
          name: row['Name'],
          rollNumber: String(row['Roll No'] || row['Roll Number']),
          subject1: Number(row['Subject1']),
          subject2: Number(row['Subject2']),
          subject3: Number(row['Subject3']),
          subject4: Number(row['Subject4']),
          subject5: Number(row['Subject5'])
        });
        await student.save();
        added++;
      } catch (err) {
        skipped++;
      }
    }

    res.json({
      message: `Import complete! ${added} students added, ${skipped} skipped.`
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
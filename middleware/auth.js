const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];

    // Query parameter se bhi token lo (PDF download ke liye)
    if (!token && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;
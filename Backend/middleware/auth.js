const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    const token = req.header('Authorization').split(' ')[1];
  console.log("token:", token); // Log the received token

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("req.user:", verified); // Log the verified user data

    req.user = verified;
    next();
  } catch (err) {
    console.error("Error verifying token:", err); // Log the error details

    if (err.name === 'JsonWebTokenError') {
      // Handle specific JWT errors (e.g., expired token, malformed token)
      return res.status(400).json({ message: 'Invalid Token' });
    } else {
      // Handle other errors
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

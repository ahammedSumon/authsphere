const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  // Payload: Data we want to store in the token
  const payload = {
    id: userId,
  };

  // Sign the token with our secret key
  // Token expires in 7 days
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
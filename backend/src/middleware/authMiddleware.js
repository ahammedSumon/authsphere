const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes - requires valid JWT token
const protect = async (req, res, next) => {
  let token;

  // Step 1: Check if token exists in cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Step 2: If no token, deny access
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized. Please log in.',
    });
  }

  try {
    // Step 3: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 4: Find the user associated with this token
    // Exclude password field from the result
    const user = await User.findById(decoded.id).select('-password');

    // Step 5: If user doesn't exist (maybe deleted after token was issued)
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found. Authorization failed.',
      });
    }

    // Step 6: Attach user object to request
    // Now all protected controllers can access req.user
    req.user = user;

    // Step 7: Continue to the protected route
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: 'Invalid token. Please log in again.',
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token expired. Please log in again.',
      });
    }

    // Generic error
    res.status(401).json({
      success: false,
      error: 'Not authorized. Please log in.',
    });
  }
};

module.exports = { protect };
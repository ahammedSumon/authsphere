
const adminOnly = (req, res, next) => {
  // Check if user exists and has admin role
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin, proceed to controller
  } else {
    res.status(403).json({
      success: false,
      error: 'Access denied. Admin privileges required.',
    });
  }
};

module.exports = { adminOnly };
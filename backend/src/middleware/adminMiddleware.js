// Middleware to restrict routes to admin users only
// IMPORTANT: This must be used AFTER the 'protect' middleware
// because it depends on req.user being attached
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
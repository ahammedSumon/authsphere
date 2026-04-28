const { validationResult } = require('express-validator');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  // Get validation results from the request
  const errors = validationResult(req);

  // If there are errors, send a 400 response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  // No errors? Continue to the controller
  next();
};

module.exports = handleValidationErrors;
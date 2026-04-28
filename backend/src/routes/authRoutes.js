const express = require('express');
const router = express.Router();
const { registerUser, loginUser,logoutUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidators');
const handleValidationErrors = require('../middleware/validationMiddleware');


router.post(
  '/register',
  validateRegister,        // Step 1: Check validation rules
  handleValidationErrors,   // Step 2: If errors exist, stop and send them
  registerUser              // Step 3: If validation passes, create user
);

router.post(
  '/login',
  validateLogin,           // Step 1: Check email format, password not empty
  handleValidationErrors,   // Step 2: Send errors if validation fails
  loginUser                 // Step 3: Authenticate and send token
)

router.post('/logout', logoutUser);

module.exports = router;
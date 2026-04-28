const express = require('express');
const router = express.Router();
const { registerUser, loginUser,logoutUser } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidators');
const handleValidationErrors = require('../middleware/validationMiddleware');


router.post(
  '/register',
  validateRegister,        
  handleValidationErrors,   
  registerUser              
);

router.post(
  '/login',
  validateLogin,           
  handleValidationErrors,   
  loginUser                
)

router.post('/logout', logoutUser);

module.exports = router;
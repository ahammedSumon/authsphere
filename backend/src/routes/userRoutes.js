const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); 


router.get('/profile', getProfile);


router.put('/profile', updateProfile);


router.delete('/profile', deleteProfile);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All routes below require authentication
router.use(protect); // This applies to ALL routes in this file

// @route   GET /api/users/profile
// @desc    Get current user's profile
// @access  Private
router.get('/profile', getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', updateProfile);

// @route   DELETE /api/users/profile
// @desc    Delete user account
// @access  Private
router.delete('/profile', deleteProfile);

module.exports = router;
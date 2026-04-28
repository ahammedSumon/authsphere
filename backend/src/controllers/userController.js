const User = require('../models/User');


const getProfile = async (req, res) => {
  try {
    
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        description: req.user.description,
        schoolName: req.user.schoolName,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get Profile Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching profile',
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, description, schoolName } = req.body;

    // Find the authenticated user
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Update fields if provided
    if (name !== undefined) user.name = name;
    if (description !== undefined) user.description = description;
    if (schoolName !== undefined) user.schoolName = schoolName;

    // Save the updated user
    const updatedUser = await user.save();

    // Send back updated user data
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        description: updatedUser.description,
        schoolName: updatedUser.schoolName,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while updating profile',
    });
  }
};


const deleteProfile = async (req, res) => {
  try {
    // Find and delete the authenticated user
    const user = await User.findByIdAndDelete(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Clear the auth cookie
    res.clearCookie('token');

    res.status(200).json({
      success: true,
      message: 'Your account has been deleted successfully',
    });
  } catch (error) {
    console.error('Delete Profile Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while deleting account',
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
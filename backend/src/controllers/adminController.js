const User = require('../models/User');

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    // Find all users, exclude passwords
    // Sort by creation date (newest first)
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users: users.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        description: user.description,
        schoolName: user.schoolName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Get All Users Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching users',
    });
  }
};

// @desc    Delete a user by ID (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        error: 'You cannot delete your own admin account',
      });
    }

    // Find the user to be deleted
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: `User "${userToDelete.name}" has been deleted successfully`,
      deletedUser: {
        id: userToDelete._id,
        name: userToDelete.name,
        email: userToDelete.email,
        role: userToDelete.role,
      },
    });
  } catch (error) {
    console.error('Delete User Error:', error.message);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format',
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while deleting user',
    });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};
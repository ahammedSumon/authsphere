const User = require('../models/User');
const generateToken = require('../utils/generateToken');


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(409).json({
        success: false,
        error: 'User already exists with this email',
      });
    }

    
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        description: user.description,
        schoolName: user.schoolName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error during registration',
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);
    console.log('Token generated:', token ? 'YES' : 'NO');
console.log('Token length:', token.length);

    res.cookie('__Secure-token', token, {
      httpOnly: true,        
      secure: true,        
      sameSite: 'none',    
      maxAge: 7 * 24 * 60 * 60 * 1000,
      partitioned: true,
    });
    console.log('Cookie set command executed');

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        description: user.description,
        schoolName: user.schoolName,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error during login',
    });
  }
};


const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('__Secure-token', {
      httpOnly: true,
      secure: true,        // Match the same options used when setting
      sameSite: 'none',
      partitioned: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Server error during logout',
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
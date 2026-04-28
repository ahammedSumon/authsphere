const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());

// Simple User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://salauddin18_db_user:39QgA6olLl2g0J2B@cluster2.ixdpjrq.mongodb.net/AuthSphere?appName=Cluster2')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

// Register route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.create({ name, email, password });
    
    res.status(201).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5001, () => console.log('Test server on port 5001'));
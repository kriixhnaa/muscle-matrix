const jwt = require('jsonwebtoken');
const Gym = require('../models/Gym');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ gym_id: id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @desc    Register a new gym
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { gym_name, owner_name, email, password, phone } = req.body;

    // Check if gym already exists
    const gymExists = await Gym.findOne({ email });
    if (gymExists) {
      return res.status(400).json({ message: 'Gym with this email already exists' });
    }

    // Create gym
    const gym = await Gym.create({
      gym_name,
      owner_name,
      email,
      password,
      phone
    });

    if (gym) {
      res.status(201).json({
        _id: gym._id,
        gym_name: gym.gym_name,
        owner_name: gym.owner_name,
        email: gym.email,
        token: generateToken(gym._id)
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login gym
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for gym email
    const gym = await Gym.findOne({ email }).select('+password');
    
    if (!gym) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await gym.matchPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: gym._id,
      gym_name: gym.gym_name,
      owner_name: gym.owner_name,
      email: gym.email,
      token: generateToken(gym._id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current logged in gym
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const gym = await Gym.findById(req.gym_id);
    res.json({
      _id: gym._id,
      gym_name: gym.gym_name,
      owner_name: gym.owner_name,
      email: gym.email,
      phone: gym.phone,
      created_at: gym.created_at
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

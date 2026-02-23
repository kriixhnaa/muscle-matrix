const jwt = require('jsonwebtoken');
const Gym = require('../models/Gym');

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get gym from token
      req.gym = await Gym.findById(decoded.gym_id).select('-password');

      if (!req.gym) {
        return res.status(401).json({ message: 'Not authorized, gym not found' });
      }

      // Attach gym_id to request for filtering
      req.gym_id = decoded.gym_id;

      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };

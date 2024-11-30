const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');

// Middleware to verify if user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to verify if user is an authorized alumni
const isAuthorizedAlumni = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'alumni') {
      return res.status(403).json({ message: 'Access denied. Alumni privileges required.' });
    }
    // Check if alumni is authorized in database
    const alumni = await Alumni.findById(decoded._id);
    if (!alumni || !alumni.isAuthorized) {
      return res.status(403).json({ message: 'Access denied. Unauthorized alumni.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to allow both admin and authorized alumni
const isAdminOrAlumni = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role === 'admin') {
      req.user = decoded;
      return next();
    }

    if (decoded.role === 'alumni') {
      const alumni = await Alumni.findById(decoded._id);
      if (!alumni || !alumni.isAuthorized) {
        return res.status(403).json({ message: 'Access denied. Unauthorized alumni.' });
      }
      req.user = decoded;
      return next();
    }

    return res.status(403).json({ message: 'Access denied. Invalid role.' });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware for public routes (visitors)
const isPublic = (req, res, next) => {
  // No authentication required
  next();
};

// Middleware to identify user type but allow all
const identifyUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      // No token means public user
      req.user = { role: 'public' };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (decoded.role === 'alumni') {
        // Verify alumni authorization status
        const alumni = await Alumni.findById(decoded._id);
        req.user = {
          ...decoded,
          isAuthorized: alumni?.isAuthorized || false
        };
      } else {
        // For admin or other roles
        req.user = decoded;
      }
    } catch (tokenError) {
      // Invalid token means public user
      req.user = { role: 'public' };
    }
    
    next();
  } catch (error) {
    console.error('Error in identifyUser middleware:', error);
    req.user = { role: 'public' };
    next();
  }
};

module.exports = {
  isAdmin,
  isAuthorizedAlumni,
  isAdminOrAlumni,
  isPublic,
  identifyUser
}; 
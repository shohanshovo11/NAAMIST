const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const Admin = require('../models/admin');

// Helper function to generate JWT
const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

// Alumni Registration
const registerAlumni = async (req, res) => {
  const {
    name, email, password, graduationYear
  } = req.body;
  try {
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const newAlumni = new Alumni({
      name,
      email,
      password,
      graduationYear,
    });
    await newAlumni.save();
    const savedAlumni = newAlumni.toObject();
    delete savedAlumni.password;
    res
      .status(201)
      .json({ alumni: savedAlumni, message: 'Registration successful' });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
};

// Login (Alumni and Admin)
const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    // Determine which model to use based on the role
    if (role === 'alumni') {
      user = await Alumni.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    // If user is not found or password does not match
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = generateToken({
      email: user.email,
      role,
      _id: user._id,
    });

    // Convert the user object to plain object and remove the password
    const userObj = user.toObject();
    delete userObj.password;

    // Respond with the token and user details
    res.status(200).json({ token, user: userObj, role });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
};
// Logout
const logoutAlumni = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Check Token Validity
const checkTokenValidity = (req, res) => {
  res.status(200).json({ isValid: true, message: 'Token is valid' });
};

// Refresh Token
const refreshToken = async (req, res) => {
  const { oldToken } = req.body;
  try {
    const decoded = jwt.verify(oldToken, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    // Generate new token
    const newToken = generateToken({
      email: decoded.email,
      role: decoded.role,
      _id: decoded._id,
    });
    res.status(200).json({ token: newToken });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'An error occurred while refreshing token' });
  }
};

module.exports = {
  registerAlumni,
  login,
  logoutAlumni,
  checkTokenValidity,
  refreshToken,
};

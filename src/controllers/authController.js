const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const Admin = require('../models/admin');

// Helper function to generate JWT
const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

// Alumni Registration
const registerAlumni = async (req, res) => {
  const {
    name, email, password, enrollmentYear, completionYear,
    studentID, batch, mobile, workplace,
    designation, facebook, linkedin, isAuthorized, workSectorType
  } = req.body;

  try {
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Access the uploaded file
    const profilePic = req.file ? req.file.filename : null;
    console.log(
      name,
      email,
      password,
      enrollmentYear,
      completionYear,
      studentID,
      batch,
      mobile,
      workplace,
      designation,
      facebook,
      linkedin,
      isAuthorized,
      workSectorType,
      'kkk'
    );
    // Create the new alumni
    const newAlumni = new Alumni({
      name,
      email,
      password,
      enrollmentYear,
      completionYear,
      studentID,
      batch,
      mobile,
      workplace,
      designation,
      facebook,
      linkedin,
      isAuthorized,
      profilePic,
      workSectorType
    });
    await newAlumni.save();

    // Remove password from the saved alumni object
    const savedAlumni = newAlumni.toObject();
    delete savedAlumni.password;

    res.status(201).json({ alumni: savedAlumni, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during registration', error });
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

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    // Check if the user is authorized
    if (user.isAuthorized === false) {
      return res.status(403).json({ message: 'Your account is not authorized yet. Please contact admin.' });
    }

    // Compare hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
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
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

// Other functions (Logout, Check Token, Refresh Token) remain the same...

module.exports = {
  registerAlumni,
  login,
  // logoutAlumni,
  // checkTokenValidity,
  // refreshToken,
};

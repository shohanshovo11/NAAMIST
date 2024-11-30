const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const Admin = require('../models/admin');
const { sendOTPEmail } = require('../utils/emailConfig');

// Helper function to generate JWT
const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

// Alumni Registration
const registerAlumni = async (req, res) => {
  const {
    name, email, password, enrollmentYear, completionYear,
    studentID, batch, mobile, workplace, bloodGroup,
    designation, facebook, linkedin, isAuthorized, workSectorType
  } = req.body;

  try {
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Access the uploaded file
    const profilePic = req.file ? req.file.filename : null;
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
      bloodGroup,
      isAuthorized,
      profilePic,
      workSectorType
    });
    await newAlumni.save();

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
      return res.status(403).json({ message: 'Your account is not authorized yet. Please wait for admin approval.' });
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

// Add this temporary test route to verify email sending
const testEmail = async (req, res) => {
  try {
    const success = await sendOTPEmail('waterhorse08@gmail.com', '123456');
    if (success) {
      res.status(200).json({ message: 'Test email sent successfully' });
    } else {
      res.status(500).json({ message: 'Failed to send test email' });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to check if OTP is expired
const isOTPExpired = (expiryDate) => {
  if (!expiryDate) return true;
  return new Date(expiryDate) < new Date();
};

// Helper function to generate expiry time
const generateOTPExpiry = () => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 10); // 10 minutes from now
  return expiryDate;
};

// Reset password with better date handling
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    const user = await Alumni.findOne({ email, resetPasswordOtp: otp });
    console.log(email, otp, "shohan");  

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid OTP" 
      });
    }

    // Check if OTP is expired
    if (isOTPExpired(user.resetPasswordExpires)) {
      return res.status(400).json({ 
        success: false,
        message: "OTP has expired" 
      });
    }

    user.password = newPassword;
    user.resetPasswordOtp = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    res.status(200).json({ 
      success: true,
      message: "Password reset successful" 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      success: false,
      message: "Error resetting password",
      error: error.message 
    });
  }
};

// Request password reset OTP with better date handling
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Alumni.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "No account found with that email" 
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = generateOTPExpiry();
    await user.save();

    const emailSent = await sendOTPEmail(email, otp);

    if (!emailSent) {
      return res.status(500).json({ 
        success: false,
        message: "Failed to send OTP email" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "Password reset OTP sent to your email" 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      success: false,
      message: "Error processing request",
      error: error.message 
    });
  }
};

// Verify reset password OTP with better date handling
const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Alumni.findOne({
      email,
      resetPasswordOtp: otp
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid OTP" 
      });
    }

    // Check if OTP is expired
    if (isOTPExpired(user.resetPasswordExpires)) {
      return res.status(400).json({ 
        success: false,
        message: "OTP has expired" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "OTP verified successfully" 
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ 
      success: false,
      message: "Error verifying OTP",
      error: error.message 
    });
  }
};

module.exports = {
  registerAlumni,
  login,
  testEmail,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  // logoutAlumni,
  // checkTokenValidity,
  // refreshToken,
};

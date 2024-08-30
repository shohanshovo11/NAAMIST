const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Convert saltRounds from string to number
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Define the Alumni schema
const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  graduationYear: {
    type: Number,
    required: true,
  },
  isAuthorized: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    required: true,
    default: 'alumni',
  },
  // Add other fields as needed
});

// Pre-save hook to hash the password before saving
alumniSchema.pre('save', function (next) {
  const alumni = this;

  // Check if the password is modified
  if (!alumni.isModified('password')) {
    return next();
  }
  // Hash the password
  bcrypt.hash(alumni.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    // Replace the plain password with the hashed password
    alumni.password = hashedPassword;
    next();
  });
});

// Define the Alumni model
const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.SALT_ROUNDS);

// Define the Alumni schema
const alumniSchema = new mongoose.Schema({
  id: { type: String },
  alumniType: {
    type: String,
    enum: [ 'GM', 'LM' ],
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  completionYear: { type: Number, required: true },
  studentID: { type: Number, required: true, unique: true },
  batch: { type: Number, required: true },
  mobile: { type: String, required: true },
  workplace: { type: String },
  workSectorType: {
    type: String,
    enum: [ 'Government', 'Private', 'Higher Study', 'Defence', 'Academician', 'Others' ],
  },
  designation: { type: String },
  facebook: { type: String },
  linkedin: { type: String },
  bloodGroup: {
    type: String,
    enum: [ 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-' ],
  },
  isAuthorized: { type: Boolean, required: true, default: false },
  role: { type: String, required: true, default: 'alumni' },
  profilePic: { type: String, default: '' },
  resetPasswordOtp: { type: String },
  resetPasswordExpires: { type: Date },
});

// Pre-save hook to hash the password before saving
alumniSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) return next(err);
    this.password = hashedPassword;
    next();
  });
});

// ID generation logic
async function generateId(doc) {
  const lastAlumni = await doc.constructor
    .findOne({ alumniType: doc.alumniType })
    .sort({ id: -1 })
    .exec();

  let newSequence = 1;
  if (lastAlumni && lastAlumni.id) {
    const lastSequence = parseInt(lastAlumni.id.slice(2), 10);
    newSequence = lastSequence + 1;
  }

  doc.id = `${doc.alumniType}${String(newSequence).padStart(3, '0')}`;
}

// Pre-save hook to generate ID for new documents or when alumniType changes
alumniSchema.pre('save', async function (next) {
  if ((this.isNew || this.isModified('alumniType')) && (this.alumniType === 'GM' || this.alumniType === 'LM')) {
    await generateId(this);
  }
  next();
});

// Pre-findOneAndUpdate hook for updates
alumniSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.alumniType === 'GM' || update.alumniType === 'LM') {
    const doc = await this.model.findOne(this.getQuery());
    if (doc && doc.alumniType !== update.alumniType) {
      doc.alumniType = update.alumniType;
      await generateId(doc);
      this.set({ id: doc.id });
    }
  }
  next();
});

// Define the Alumni model
const Alumni = mongoose.model('Alumni', alumniSchema);

module.exports = Alumni;

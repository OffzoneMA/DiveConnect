const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false }, // select: false to hide by default
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Role enum with default value
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Trim and lowercase email before saving
userSchema.pre('save', function(next) {
  this.email = this.email.trim().toLowerCase();
  next();
});

module.exports = mongoose.model('User', userSchema);
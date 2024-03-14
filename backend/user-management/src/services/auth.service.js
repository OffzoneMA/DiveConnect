const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

exports.registerUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new userModel({ ...userData, password: hashedPassword });
  return await user.save();
};

exports.loginUser = async (userData) => {
  const user = await userModel.findOne({ email: userData.email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(userData.password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

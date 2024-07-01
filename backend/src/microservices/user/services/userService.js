const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getUsers = async () => {
  return await User.find({}, "name email role createdAt updatedAt");
};

exports.getUserById = async (id) => {
  return await User.findById(id);
};

exports.updateUserById = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

exports.deleteUserById = async (id) => {
  return await User.findByIdAndDelete(id);
};

exports.registerUser = async (userData) => {
  const user = await User.create(userData);
  return;
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

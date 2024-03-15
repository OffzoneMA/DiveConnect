const User = require('../models/User');

exports.getUsers = async () => {
  const users = await User.find();
  return users;
};

exports.getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.updateUser = async (id, userData) => {
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

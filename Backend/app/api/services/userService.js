/* eslint-disable arrow-body-style */

const bcrypt = require('bcryptjs');
const { salt } = require('../../config/config');
const userRepository = require('../repositories/userRepository');

const createUser = async (user) => {
  const userData = user;
  userData.password = await bcrypt.hash(userData.password, parseInt(salt, 10));
  const createdUser = await userRepository.createUserInDB(userData);
  return createdUser;
};

const verifyUserInfo = async (email) => {
  const userData = await userRepository.verifyUserExistence(email);
  return userData;
};

const checkPassword = async (UserPass, DBPass) => {
  const passwordCheck = await bcrypt.compare(UserPass, DBPass);
  return passwordCheck;
};

module.exports = {
  createUser,
  verifyUserInfo,
  checkPassword,
};

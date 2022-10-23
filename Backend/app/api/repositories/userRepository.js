const dbInstance = require('../models');

const createUserInDB = async (user) => {
  const userCreate = await dbInstance.users.create(user);
  return userCreate;
};

const verifyUserExistence = async (email) => {
  const emailExist = await dbInstance.users.findOne({
    raw: true,
    where: { email_id: email },
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
  });
  return emailExist;
};

module.exports = {
  createUserInDB,
  verifyUserExistence,
};

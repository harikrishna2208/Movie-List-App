/* eslint-disable object-curly-newline */
const userService = require('../services/userService');
const jwtService = require('../middleware/JWT');
const constants = require('../utils/constants');
const appResponse = require('../utils/AppResponse');
const logger = require('../middleware/logger');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check whether User is already registered in user database
    const userEmailExist = await userService.verifyUserInfo(email);

    if (userEmailExist) {
      return appResponse.conflict(res, constants.DUPLICATE_RECORD);
    }

    const userCreated = await userService.createUser({
      full_name: name.replace(/\s+/g, ' ').trim(),
      email_id: email.toLowerCase(),
      password,
    });

    if (!userCreated) return appResponse.conflict(res, constants.USER_NOT_CREATED);

    return appResponse.created(res, constants.USER_CREATED);
  } catch (error) {
    logger.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      if (error.errors[0].message === 'email_id must be unique') {
        return appResponse.badRequest(res, constants.DUPLICATE_ENTRIES);
      }
    }
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

const loginUser = async (req, res) => {
  try {
    const emailId = req.body.email.toLowerCase();
    const userRecord = await userService.verifyUserInfo(emailId);
    if (!userRecord) {
      return appResponse.notFound(res, { message: constants.NO_RECORD_FOUND });
    }
    if (await userService.checkPassword(req.body.password, userRecord.password)) {
      const accessToken = jwtService.generateAccessToken(userRecord.email_id);
      const refreshToken = jwtService.generateRefreshToken(userRecord.email_id);
      res.cookie('refreshTokenMovies', refreshToken, {
        maxAge: 86400000,
        httpOnly: true,
      });
      return appResponse.success(res, constants.LOGGED_IN, {
        accessToken,
        userEmail: userRecord.email_id,
      });
    }
    return appResponse.invalidCredentials(res, constants.PASS_INCORRECT);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

module.exports = {
  createUser,
  loginUser,
};

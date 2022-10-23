// const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const { accessTokenKey, refreshTokenKey, resetSecret } = require('../../config/config');
const appResponse = require('../utils/AppResponse');
const constants = require('../utils/constants');
const logger = require('./logger');

const verifyAccessToken = (req, res, next) => {
  if (
    !req.headers?.authorization ||
    (req.headers.authorization === 'Bearer' && req.headers.authorization.length === 6)
  ) {
    // if No Token present Return 500

    return appResponse.internalServerError(res, { message: constants.NO_TOKEN }, { tokenPresent: false });
  }
  // destruct the Second value (Token) From array
  const [, token] = req.headers.authorization.split(' ');

  jwt.verify(token, accessTokenKey, (err, decodedResult) => {
    if (err) {
      return appResponse.invalidCredentials(res, { message: constants.TOKEN_FAIL });
    }

    res.locals.email = decodedResult.email;
    // go to Next Middleware in the stack
    next();
  });
};

const generateAccessToken = (email) => {
  // embed email into token ,use it check user authentication in middleware for resource access
  const user = { email };
  const accessToken = jwt.sign(user, accessTokenKey, { expiresIn: '80m' }); // access token valid for 80minutes
  return accessToken;
};

const generateRefreshToken = (email) => {
  // embed email into token ,use it check User authentication in middleware for resource access
  const user = { email };
  const refreshToken = jwt.sign(user, refreshTokenKey, {
    expiresIn: '1d', // refresh token valid for 1 day
  });
  return refreshToken;
};

const generateTokens = (req, res) => {
  // using refresh token to generate new access token
  if (!req.cookies?.refreshTokenMovies) {
    // if refresh token not present return internal server error
    return appResponse.internalServerError(res, { message: constants.NO_COOKIE }, { tokenPresent: false });
  }

  const refreshToken = jwt.verify(req.cookies.refreshTokenMovies, refreshTokenKey, (err) => {
    if (err) return false;
    return true;
  });

  if (!refreshToken) {
    return appResponse.internalServerError(res, { message: constants.TOKEN_GEN_FAIL }, { tokenVerify: false });
  }
  const accessToken = generateAccessToken(req.body.email);
  return appResponse.success(res, { message: constants.TOKEN_GENERATED }, { accessToken });
};

const logLogoutUser = (token) => {
  jwt.verify(token, refreshTokenKey, (err, decoded) => {
    if (err) logger.error(err);
    logger.info(`${decoded.email} is logged out`);
  });
};

const logoutUser = (req, res) => {
  const setCookieData = req.cookies?.refreshTokenMovies;
  if (!setCookieData) {
    return appResponse.internalServerError(res, { message: constants.NO_COOKIE }, { tokenPresent: false });
  }
  logLogoutUser(req.cookies.refreshTokenMovies); // remove in production if Not Needed check who logged out
  // immediately Remove Cookies from Browser
  res.cookie('refreshTokenMovies', '', { maxAge: -1, overwrite: true });
  return appResponse.success(res, { message: constants.DELETE_SUCCESSFUL });
};

module.exports = {
  verifyAccessToken,
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  logoutUser,
};

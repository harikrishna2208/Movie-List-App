const { signUpSchema, loginSchema, movieSchemaFunction } = require('../utils/validationSchema');
const appResponse = require('../utils/AppResponse');

const constants = require('../utils/constants');
const logger = require('./logger');
const { getAllMoviesNameFromDb } = require('../services/movieService');

const signUpValidation = (req, res, next) => {
  // validate the req.body to pass certain criteria.
  const result = signUpSchema.validate(req.body);
  const { error } = result; // check whether error exist from validation
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, error.message);
  }
  next();
};

const loginValidation = (req, res, next) => {
  const result = loginSchema.validate(req.body);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, error.message);
  }
  next();
};

const movieDetailsValidation = async (req, res, next) => {
  const allMovieNames = await getAllMoviesNameFromDb();

  const result = movieSchemaFunction(req.body, allMovieNames);
  const { error } = result;
  const valid = error == null;
  if (!valid) {
    logger.info(error);
    // return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, error.message);
    const errorIndex = [...new Set(error.details.map(({ path }) => path[0]))];
    const errorDetails = error.details.map(({ message, path }) => ({
      indexValue: path[0],
      rowNumber: path[0] + 1,
      field: path[1],
      // \[[^\]]\]{1} => regex pattern to match only one occurrence/first of [all data within brackets included]
      errorMessage: message.replace(/\[[^\]]\]{1}/gi, '').replace(/([.]{1})/gi, ''),
    }));
    return appResponse.unProcessableEntity(res, constants.INVALID_INPUT, {
      errorIndex,
      errorDetails,
    });
  }
  next();
};

module.exports = {
  signUpValidation,
  loginValidation,
  movieDetailsValidation,
};

const moviesService = require('../services/movieService');

const constants = require('../utils/constants');
const appResponse = require('../utils/AppResponse');
const logger = require('../middleware/logger');

const getAllMoviesDetails = async (req, res) => {
  try {
    const allMoviesDetails = await moviesService.getAllMoviesFromDb();
    if (!allMoviesDetails) return appResponse.conflict(res, constants.NO_RECORD_FOUND);
    return appResponse.success(res, constants.SUCCESSFULLY_FETCHED, allMoviesDetails);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

const saveNewMovies = async (req, res) => {
  try {
    const movieDetails = req.body;
    const saveMovieDetails = await moviesService.saveNewMoviesDetailsToDatabase(movieDetails);
    if (!saveMovieDetails) return appResponse.conflict(res, constants.DATA_NOT_SAVED);
    return appResponse.created(res, constants.INSERTED_SUCCESSFULLY);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

const updateMoviesDetails = async (req, res) => {
  try {
    const movieDetails = req.body;
    const updateMovieDetails = await moviesService.updateMovieDetailsInDatabase(movieDetails);
    if (!updateMovieDetails) return appResponse.conflict(res, constants.UPDATE_FAIL);
    return appResponse.success(res, constants.DATA_UPDATED, updateMovieDetails);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

const deleteMovieDetails = async (req, res) => {
  try {
    const movieDetails = req.body;
    const deleteMovieDetail = await moviesService.deleteMoviesDetailFromDb(movieDetails.id);
    if (!deleteMovieDetail) return appResponse.conflict(res, constants.DATA_NOT_SAVED);
    return appResponse.success(res, constants.DELETE_SUCCESSFUL);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};

const getAllMovieNamesFromDatabase = async (req, res) => {
  try {
    const allMoviesDetails = await moviesService.getAllMoviesNameFromDb();
    if (!allMoviesDetails) return appResponse.conflict(res, constants.NO_RECORD_FOUND);
    return appResponse.success(res, constants.SUCCESSFULLY_FETCHED, allMoviesDetails);
  } catch (error) {
    logger.error(error);
    return appResponse.internalServerError(res, constants.DATA_NOT_SAVED);
  }
};
module.exports = {
  getAllMovieNamesFromDatabase,
  getAllMoviesDetails,
  saveNewMovies,
  deleteMovieDetails,
  updateMoviesDetails,
};

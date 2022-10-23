const express = require('express');

const moviesRouter = express.Router(); // login
const moviesController = require('../../controllers/moviesController');
const jwtService = require('../../middleware/JWT');
const { movieDetailsValidation } = require('../../middleware/validation');
// moviesRouter.get('/getAllMoviesDetails');

// signup route
moviesRouter.post(
  '/saveNewMoviesDetails',
  jwtService.verifyAccessToken,
  movieDetailsValidation,
  moviesController.saveNewMovies,
);

moviesRouter.get('/allMoviesDetails', moviesController.getAllMoviesDetails);

// login route
moviesRouter.put('/updateMoviesDetails', jwtService.verifyAccessToken, moviesController.updateMoviesDetails);

moviesRouter.delete('/deleteMoviesDetails', jwtService.verifyAccessToken, moviesController.deleteMovieDetails);

module.exports = moviesRouter;

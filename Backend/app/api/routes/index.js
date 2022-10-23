const express = require('express');

const router = express.Router();
const jwtService = require('../middleware/JWT');
const userRoute = require('./movies/userRoute');
const moviesRoute = require('./movies/movies');

router.use('/user', userRoute); // user details
router.use('/movies', moviesRoute);
router.use('/token', jwtService.verifyAccessToken); // For development

router.use('/refreshToken', jwtService.generateTokens);

router.use('/logout', jwtService.logoutUser);

router.use((req, res, next) => {
  const error = new Error('Not Found || No route');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: { message: error.message } });
});

module.exports = router;

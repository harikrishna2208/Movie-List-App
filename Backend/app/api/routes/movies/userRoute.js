const express = require('express');

const router = express.Router();
const middleware = require('../../middleware/validation');
const userController = require('../../controllers/userController');

router.post('/register', middleware.signUpValidation, userController.createUser); // signup route

router.post('/login', middleware.loginValidation, userController.loginUser); // login route

module.exports = router;

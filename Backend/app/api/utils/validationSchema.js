/* eslint-disable newline-per-chained-call */
const Joi = require('joi');
const { joiPassword } = require('joi-password');

const signUpSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  // used joi password library to validate password
  password: joiPassword
    .string()
    .min(8)
    .max(32)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required()
    .messages({
      'password.minOfUppercase': '{#label} must contain Minimum of {#min} uppercase character',
      'password.minOfLowercase': '{#label} must contain Minimum of {#min} lowercase character',
      'password.minOfSpecialCharacters': '{#label} must contain Minimum of {#min} special character',
      'password.minOfNumeric': '{#label} must contain Minimum of {#min} Numeric character',
      'password.noWhiteSpaces': '{#label} must not contain any white space',
    })
    .label('Password'),

  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const movieSchemaFunction = (requestBody, movieNames) => {
  const movieNameFromDb = movieNames ?? [''];
  const movieDetailsElementSchema = Joi.object().keys({
    movie_name: Joi.string()
      .required()
      .invalid(...movieNameFromDb)
      .label('Movie Name')
      .messages({ 'any.invalid': 'Duplicate Movie Name,please add different movie Details' }),
    rating: Joi.number().required().label('Rating'),
    cast: Joi.array().items(Joi.string()).required().min(1).label('Cast'),
    genre: Joi.string().required().label('Genre'),
    release_date: Joi.string().required().label('Date'),
  });

  const movieDetailsSchema = Joi.array().items(movieDetailsElementSchema);
  return movieDetailsSchema.validate(requestBody, { abortEarly: false, allowUnknown: true });
};
module.exports = {
  signUpSchema,
  loginSchema,
  movieSchemaFunction,
};

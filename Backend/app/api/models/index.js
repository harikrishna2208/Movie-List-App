/* eslint-disable wrap-iife */
/* eslint-disable func-names */

const { Sequelize } = require('sequelize');
const sequelize = require('../../config/db.config');
const logger = require('../middleware/logger');

const db = {};

// create Schema if not Exist
(async function () {
  await sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes('movies')) await sequelize.createSchema('movies');
  });
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./movies/user')();
db.movies = require('./movies/movies')();

module.exports = db;

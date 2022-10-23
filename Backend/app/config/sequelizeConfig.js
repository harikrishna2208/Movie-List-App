/* eslint-disable object-curly-newline */
require('dotenv').config();
const {
  db: { databaseDialect, databaseName, databaseHost, databasePassword, databasePort, databaseUserName },
} = require('./config');
// used by sequelize cli to run migration/seeders

module.exports = {
  development: {
    username: databaseUserName ?? process.env.DB_USER.toString(),
    password: databasePassword ?? process.env.DB_PASSWORD.toString(),
    database: databaseName ?? process.env.DB_DATABASE.toString(),
    host: databaseHost ?? process.env.DB_HOST.toString(),
    port: databasePort ?? process.env.DB_PORT.toString(),
    dialect: databaseDialect ?? 'postgres',
  },
  test: {
    username: databaseUserName ?? process.env.DB_USER.toString(),
    password: databasePassword ?? process.env.DB_PASSWORD.toString(),
    database: databaseName ?? process.env.DB_DATABASE.toString(),
    host: databaseHost ?? process.env.DB_HOST.toString(),
    port: databasePort ?? process.env.DB_PORT.toString(),
    dialect: databaseDialect ?? 'postgres',
  },
  production: {
    username: databaseUserName ?? process.env.DB_USER.toString(),
    password: databasePassword ?? process.env.DB_PASSWORD.toString(),
    database: databaseName ?? process.env.DB_DATABASE.toString(),
    host: databaseHost ?? process.env.DB_HOST.toString(),
    port: databasePort ?? process.env.DB_PORT.toString(),
    dialect: databaseDialect ?? 'postgres',
  },
};

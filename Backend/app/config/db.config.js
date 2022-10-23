/* eslint-disable object-curly-newline */
const { Sequelize } = require('sequelize');
const {
  db: { databaseDialect, databaseName, databaseHost, databasePassword, databasePort, databaseUserName },
} = require('./config');

const sequelize = new Sequelize(databaseName, databaseUserName, databasePassword, {
  host: databaseHost,
  port: databasePort,
  dialect: databaseDialect,
  logging: false,
  dialectOptions: { prependSearchPath: true, useUTC: false },
  timezone: '+05:30',
});

module.exports = sequelize;

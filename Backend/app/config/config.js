require('dotenv').config();

const config = {
  db: {
    databasePort: process.env.DB_PORT.toString(),
    databaseHost: process.env.DB_HOST.toString(),
    databaseUserName: process.env.DB_USER.toString(),
    databasePassword: process.env.DB_PASSWORD.toString(),
    databaseDialect: process.env.DB_DIALECT.toString(),
    databaseName: process.env.DB_DATABASE.toString(),
  },
  port: process.env.PORT,
  salt: process.env.SALT ?? 10,
  nodeEnvironment: process.env.NODE_ENV.toString(),
  accessTokenKey: process.env.ACCESS_TOKEN.toString(),
  refreshTokenKey: process.env.REFRESH_TOKEN.toString(),
};

module.exports = config;

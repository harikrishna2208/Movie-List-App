require('dotenv').config();
const express = require('express');

const app = express();

const cors = require('cors');
const expressPinoLogger = require('express-pino-logger');
const cookieParser = require('cookie-parser');

const { port } = require('./app/config/config');

const logger = require('./app/api/middleware/logger');
const routes = require('./app/api/routes');
const sequelize = require('./app/config/db.config');
const models = require('./app/api/models');

app.use(cookieParser());

const loggerMiddleware = expressPinoLogger({
  logger,
  autoLogging: false,
});

app.use(loggerMiddleware);

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  }),
);

app.use('/', routes);

sequelize
  .authenticate()
  .then(async () => {
    await models.sequelize.sync({}); // create tables after successful connection
    logger.info('Connection To Database has been established successfully.');
    process.send('ready');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:');
    logger.error(error);
  });

app.listen(port, () => {
  logger.info(`App running on port ${port}.`);
});

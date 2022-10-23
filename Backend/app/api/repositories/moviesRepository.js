const dbInstance = require('../models');

const getAllMoviesDetailFromDb = async () => {
  const allMovies = await dbInstance.movies.findAll({
    raw: true,
  });
  return allMovies;
};
const saveNewMoviesToDatabase = async (moviesDetails) => {
  const saveToDb = await dbInstance.movies.bulkCreate(moviesDetails);
  return saveToDb;
};

const updateMoviesInDatabase = async (moviesDetails) => {
  const updateToDB = await dbInstance.movies.bulkCreate(moviesDetails, {
    updateOnDuplicate: ['rating', 'cast', 'genre', 'release_date'],
    returning: true,
  });
  return updateToDB;
};

const deleteMoviesDetailsFromDb = async (moviesDetailsId) => {
  const deleteInDb = await dbInstance.movies.destroy({ where: { id: moviesDetailsId } });
  return deleteInDb;
};

const getAllMoviesNameFromDatabase = async () => {
  const movieNames = await dbInstance.movies.findAll({
    attributes: [
      [
        dbInstance.Sequelize.fn(
          'ARRAY_AGG',
          dbInstance.Sequelize.fn('DISTINCT', dbInstance.Sequelize.col('movie_name')),
        ),
        'movie_name',
      ],
    ],
    raw: true,
  });
  return movieNames[0].movie_name;
};

module.exports = {
  getAllMoviesNameFromDatabase,
  getAllMoviesDetailFromDb,
  saveNewMoviesToDatabase,
  updateMoviesInDatabase,
  deleteMoviesDetailsFromDb,
};

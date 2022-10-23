const moviesRepository = require('../repositories/moviesRepository');

const getAllMoviesFromDb = async () => {
  const allMovieDetails = await moviesRepository.getAllMoviesDetailFromDb();
  return allMovieDetails;
};
const saveNewMoviesDetailsToDatabase = async (moviesDetails) => {
  const saveMovieDetails = await moviesRepository.saveNewMoviesToDatabase(moviesDetails);
  return saveMovieDetails;
};
const updateMovieDetailsInDatabase = async (moviesDetails) => {
  const updatedMovies = await moviesRepository.updateMoviesInDatabase(moviesDetails);
  return updatedMovies;
};

const deleteMoviesDetailFromDb = async (moviesId) => {
  const deletedMovie = await moviesRepository.deleteMoviesDetailsFromDb(moviesId);
  return deletedMovie;
};

const getAllMoviesNameFromDb = async () => {
  const allMovieName = await moviesRepository.getAllMoviesNameFromDatabase();
  return allMovieName;
};
module.exports = {
  getAllMoviesNameFromDb,
  getAllMoviesFromDb,
  saveNewMoviesDetailsToDatabase,
  deleteMoviesDetailFromDb,
  updateMovieDetailsInDatabase,
};

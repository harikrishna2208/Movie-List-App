const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db.config');

module.exports = () => {
  const moviesTable = sequelize.define(
    'movies',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'name of the movie',
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cast: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    { freezeTableName: true, schema: 'movies', timestamps: false },
  );

  return moviesTable;
};

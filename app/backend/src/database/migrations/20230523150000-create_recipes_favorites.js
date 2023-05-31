'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipesFavorites', {
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      idRecipe: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alcoholicOrNot: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nationality: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipesFavorites');
  }
};
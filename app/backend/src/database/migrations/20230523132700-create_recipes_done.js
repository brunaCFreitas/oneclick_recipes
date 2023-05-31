'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipesDone', {
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
      doneDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      nationality: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tags: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipesDone');
  }
};

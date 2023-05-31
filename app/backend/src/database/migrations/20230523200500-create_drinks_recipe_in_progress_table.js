'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drinksRecipeInProgress', {
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
      idDrink: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        references: {
          model: 'drinks',
          key: 'idDrink',
        },
        onDelete: 'CASCADE',
      },
      strIngredient1: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient2: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient3: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient4: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient5: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient6: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient7: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient8: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient9: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient10: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient11: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient12: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient13: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient14: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      strIngredient15: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isFinished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('drinksRecipeInProgress');
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mealsIngredients', {
      idIngredient: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      strIngredient: { type: Sequelize.STRING },
      strDescription: { type: Sequelize.TEXT },
      strType: { type: Sequelize.STRING },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mealsIngredients');
  }
};
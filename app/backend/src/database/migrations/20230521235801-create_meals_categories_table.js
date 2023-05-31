'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mealsCategories', {
      idCategory: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      strCategory: { type: Sequelize.STRING },
      strCategoryThumb: { type: Sequelize.STRING },
      strCategoryDescription: { type: Sequelize.TEXT },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mealsCategories');
  }
};
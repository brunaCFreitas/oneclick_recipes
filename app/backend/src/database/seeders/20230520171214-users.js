'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: '$2y$10$UzmhXVpIn8Bs700xm5JLNuDBOFPCt.DBSFEXQ0USpkoiPmi58bmfK'
          // senha: Abc123@
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};

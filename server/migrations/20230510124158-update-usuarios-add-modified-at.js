'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // add modified_at
    await queryInterface.addColumn('usuarios', 'modified_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'modified_at');
  }
};
// npx sequelize-cli migration:generate --name update-usuarios-add-modified-at
// executa o método up
// npx sequelize-cli db:migrate
// executa o método down
// npx sequelize-cli db:migrate:undo
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // muda o nome da coluna data para birthday
    await queryInterface.renameColumn('usuarios', 'data', 'birthday');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('usuarios', 'birthday', 'data');
  }
};
// npx sequelize-cli migration:generate --name update-usuarios-add-modified-at
// executa o método up
// npx sequelize-cli db:migrate
// executa o método down
// npx sequelize-cli db:migrate:undo
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  // deleta os atributos crestedAt, updatedAt e deletedAt modified_at da tabela de usuários
  await queryInterface.removeColumn('endereco', 'createdAt');
  await queryInterface.removeColumn('endereco', 'updatedAt');
  await queryInterface.removeColumn('endereco', 'deletedAt');

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

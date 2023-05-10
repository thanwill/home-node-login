'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // deleta os atributos crestedAt, updatedAt e deletedAt modified_at da tabela de usuários
    await queryInterface.removeColumn('usuarios', 'modified_at');
    await queryInterface.removeColumn('usuarios', 'deleted_at');
    await queryInterface.removeColumn('usuarios', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('usuarios', 'modified_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn('usuarios', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });

  }
};

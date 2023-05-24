'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // altera subtipo para receber apenas 'compra', 'venda', 'transferencia', 'producao'
    await queryInterface.changeColumn('movimentos', 'subtipo', {
      type: Sequelize.ENUM('compra', 'venda', 'transferencia', 'producao'),
      allowNull: false
    });
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

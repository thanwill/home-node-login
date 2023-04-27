'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
  
    await queryInterface.addColumn('Users', 'endereco', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'cpf');
    await queryInterface.removeColumn('Users', 'type');
    await queryInterface.removeColumn('Users', 'endereco');
  }
};

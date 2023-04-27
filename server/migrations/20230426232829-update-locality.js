'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'localidade_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'localidade_id');
  }
};

// npx sequelize-cli db:migrate --name update --attibutes localidade_id:uuid 

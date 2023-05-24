'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // vai deletar a coluna 'user_id' da tabela 'endereco' que referencia a tabela 'usuarios'
    await queryInterface.removeColumn('endereco', 'usuario_id');

  },

  async down (queryInterface, Sequelize) {
    // vai criar a coluna 'user_id' da tabela 'endereco' que referencia a tabela 'usuarios'
    await queryInterface.addColumn('endereco', 'usuario_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

  }
};

// npx sequelize-cli db:migrate

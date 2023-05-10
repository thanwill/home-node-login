'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

      // cria a migration de endereco
      await queryInterface.createTable('endereco', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          rua: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          numero: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          complemento: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          bairro: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          cidade: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          estado: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          pais: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          cep: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
          },
          // foreign key
          user_id: {

            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: 'usuarios',
              key: 'id',

            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        })
        .then(() => queryInterface.addIndex('endereco', ['user_id']));
      },
      
      async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('endereco');
      }
            
    };

// cria a migration
// npx sequelize migration:generate --name update-address

// executa a migration
// npx sequelize-cli db:migrate

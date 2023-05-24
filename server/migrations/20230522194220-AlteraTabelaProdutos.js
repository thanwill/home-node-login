/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // exclui o campo quantidade da tabela produtos
    await queryInterface.removeColumn("produtos", "preco_unitario");
    // adiciona o campo preco_unitario na tabela movimentos 
    await queryInterface.addColumn("movimentos", "preco_unitario", {
      type: Sequelize.DOUBLE,
      allowNull: false,
    });


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};

// código para criar uma migration
// npx sequelize-cli migration:generate --name AlteraTabelaProdutos

// código para executar essa migration
// npx sequelize-cli db:migrate --env development
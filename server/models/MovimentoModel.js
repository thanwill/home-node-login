const { Sequelize, DataTypes } = require('sequelize');
const database = require('./DatabaseModel');

const Movimentos = database.define('Movimentos', {
    id: {
      type: DataTypes.INTEGER,
      defaultValue: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // tipo de movimentação ENUM (entrada, saída)
    tipo: {
      type: DataTypes.ENUM('entrada', 'saida'),
      allowNull: false
    },
    // documento suporte da movimentação
    documento: {
      type: DataTypes.ENUM('nota fiscal','ordem de serviço'),
      allowNull: false
    },
    subtipo : {
      type: DataTypes.ENUM('compra', 'venda', 'transferencia', 'producao'),
      allowNull: false
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    
    // FK referenciando a tabela Estoque
    estoque_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'depositos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    // FK referenciando a tabela Produtos
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
  }, {
    tableName: 'movimentos',
    timestamps: true,
    indexes: [{
        unique: true,
        fields: ['id']
    }]

  });

module.exports = Movimentos;
  
  
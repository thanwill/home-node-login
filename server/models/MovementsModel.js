const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

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
    tipo: {
      type: DataTypes.ENUM('entrada', 'saida'),
      allowNull: false
    },
    // FK referenciando a tabela Estoque
    estoque_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Estoque',
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
            model: 'Produtos',
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
  
  
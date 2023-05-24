const { Sequelize, DataTypes } = require('sequelize');
const database = require('./DatabaseModel');

const Produtos = database.define('Produtos', {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'produtos',
    timestamps: true,
    indexes: [{
        unique: true,
        fields: ['nome']
    }, 
    {
        unique: true,
        fields: ['id']
    }]

});

module.exports = Produtos;



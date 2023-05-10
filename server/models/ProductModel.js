const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

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
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subcategoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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



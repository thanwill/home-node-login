const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const Depositos = database.define('Depositos', {
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
    endereco_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Enderecos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
}, {
    tableName: 'depositos',
    timestamps: true,
    indexes: [{
        unique: true,
        fields: ['id']
    }]
});

module.exports = Depositos;

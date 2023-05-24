const { Sequelize, DataTypes } = require('sequelize');
const database = require('./DatabaseModel');

const Address = database.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        defaultValue: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false,
    }

}, {
    tableName: 'endereco',
    timestamps: true, 
    indexes: [
        {
            unique: true,
            fields: ['id']
            
        }
    ]
});

// npx sequelize-cli migration:generate --name update-address
// npx sequelize-cli db:migrate

module.exports = Address;

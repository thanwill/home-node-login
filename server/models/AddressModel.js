const { Sequelize, DataTypes } = require('sequelize');

const database = require('./database');

const Address = database.define('Address', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
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
    },
    // foreign key com a tabela de usuários em casdade de delete do usuário
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    }

}, {
    tableName: 'endereco',
    timestamps: false

});


// npx sequelize-cli migration:generate --name update-address
// npx sequelize-cli db:migrate

module.exports = Address;

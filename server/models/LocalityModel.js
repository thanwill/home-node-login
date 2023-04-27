const { Sequelize, DataTypes } = require('sequelize');

const database = require('./database');

const Locality = database.define('Locality', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }, 
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    }    
});

Locality.belongsTo('User', { foreignKey: 'user_id', as: 'user' }); // um endereco pertence a um usuario

// cóigo para criar migration com os dados atualizados do endereco do usuario
// npx sequelize-cli migration:generate --name update-locality

module.exports = Locality;

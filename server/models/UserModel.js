const { Sequelize, DataTypes } = require('sequelize');

const database = require('./database');


const User = database.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
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
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  localidade_id: {
    type: DataTypes.UUID,
    allowNull: false,
  }

});

User.hastoMany('Locality', { foreignKey: 'user_id', as: 'locality' }); // um usuario tem muitos enderecos

// comando para criar migration atualizadda com o cpf, type e endereco
// npx sequelize migration:generate --name add-cpf-type-endereco-to-users

module.exports = User;

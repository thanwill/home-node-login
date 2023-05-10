const { Sequelize, DataTypes } = require('sequelize');
const database = require('./database');

const User = database.define('User', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, 
{
  tableName : 'usuarios',
  timestamps: true,
  indexes : [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['cpf']
    }
  ]
});

module.exports = User;

// cria uma migration
// npx sequelize migration:create --name=create_users
// executa a migration
// npx sequelize db:migrate


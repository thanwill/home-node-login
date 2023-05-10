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
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, 
{
  tableName : 'usuarios',
  timestamps: false

});

module.exports = User;

// sequelize-auto-migrations --db <url do banco de dados> --models-path <caminho dos modelos> --migrations-path <caminho das migrations>

// npx sequelize-auto-migrations --db /usr/local/mysql/data/ --models-path server/models --migrations-path server/migrations


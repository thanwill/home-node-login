const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('erp', 'root', 'atzmkl712', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
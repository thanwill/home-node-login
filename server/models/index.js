const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const process = require("process");
const basename = path.basename(__filename);
// cria uma variável de ambiente para o ambiente de desenvolvimento
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
// importa meu arquivo env
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const db = {
  User: require("./UserModel"),
};

let sequelize;
// valida se a variável de ambiente é igual a 'production'
if (config.use_env_variable) {
  // cria uma variável de ambiente para o ambiente de desenvolvimento
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // senao cria uma variável de ambiente para o ambiente de desenvolvimento
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname) // lê o diretório atual // lê o diretório atual e retorna um array com os nomes dos arquivos
  .filter(file => {
    // filtra os arquivos
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    ); // retorna os arquivos que não começam com '.' e que não são o arquivo index.js e que terminam com '.js'
  })
  .forEach(file => {
    // para cada arquivo
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    ); // importa o arquivo
    db[model.name] = model; // adiciona o arquivo ao objeto db
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// adiciona o objeto sequelize ao objeto db
db.sequelize = sequelize;
// adiciona o objeto Sequelize ao objeto db
db.Sequelize = Sequelize;

module.exports = db;

// criar uma migration

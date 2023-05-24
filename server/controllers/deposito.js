const Depositos = require("../models/DepositoModel");
const { Endereco } = require('./enderecos');
class Deposito {
  constructor(
    nome,
    endereco_id
  ) {
    this.id = parseInt();
    this.nome = nome;
    this.endereco_id = parseInt(endereco_id);
  }

  // cria um novo deposito
  static async criarDeposito(inventory) {
    try {

      // vai buscar o endereço pelo id e se não encontrar retorna um erro 
      const endereco = await Endereco.getEndereco(inventory.endereco_id);
      if (!endereco) {
        return {
          status: false,
          message: "Endereço não encontrado!",
        };
      }
    
      const newInventory = await Depositos.create({
        id: parseInt(),
        nome: inventory.nome,
        endereco_id: endereco.id,
      });

      // se não for possível salvar o deposito
      if (!newInventory) {
        return {
          status: false,
          message: "Não foi possível salvar o depósito!",
        };
      }

      return {
        status: true,
        message: "Depósito salvo com sucesso!",
      };
    } catch (err) {
      return err;
    }

  }

  // lista todos os depositos
  static async listarDeposito() {
    try {
      const inventories = await Depositos.findAll({
        attributes: ["id", "nome", "endereco_id"],
      });

      return inventories;
    } catch (err) {
      return err;
    }
  }
}



module.exports = {
  Deposito
};
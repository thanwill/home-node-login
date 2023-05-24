const Depositos = require("../models/DepositoModel");
const Validator = require("./validation");

const {
  Endereco
} = require('./enderecos');

class Deposito extends Validator {

  constructor(
    nome,
    endereco_id
  ) {
    super();
    this.id = parseInt();
    this.nome = nome;
    this.endereco_id = parseInt(endereco_id);
  }

  // cria um novo deposito
  static async salvar(inventory) {
    // vai buscar o endereço pelo id e se não encontrar retorna um erro 
    const endereco = await Endereco.getEndereco(inventory.endereco_id);
    if (endereco.status === false) {
      return {
        status: false,
        message: "O endereço não foi encontrado!",
      };
    }

    // verifica se o nome do deposito já existe
    const inventoryExists = await Depositos.findOne({
      where: {
        nome: inventory.nome,
      },
    });

    if (inventoryExists) {
      return {
        status: false,
        message: "Depósito já cadastrado!",
      };
    }

    try {
      const newInventory = await Depositos.create({
        id: parseInt(),
        nome: inventory.nome,
        endereco_id: parseInt(inventory.endereco_id),
      });

      // Se o endereço for encontrado, adiciona os dados do endereço à resposta
      if (endereco) {
        newInventory.dataValues.endereco = endereco;
      }

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
        data: newInventory,
      };
    } catch (err) {
      return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
    }
  }

  // lista todos os depositos
  static async listar() {
    try {
      const inventories = await Depositos.findAll({
        attributes: ["id", "nome", "endereco_id"],
      });

      return inventories;
    } catch (err) {
      return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
    }
  }

  // lista um deposito pelo id
  static async listarId(id) {
    try {
      const inventory = await Depositos.findByPk(id, {
        attributes: ["id", "nome", "endereco_id"],
      });

      // se não encontrar o deposito
      if (!inventory) {
        return {
          status: false,
          message: "Depósito não encontrado!",
        };
      }

      // vai buscar o endereço pelo id e se não encontrar retorna um erro 
      const endereco = await Endereco.getEndereco(inventory.endereco_id);
      if (endereco.status === false) {
        return {
          status: false,
          message: "O endereço não foi encontrado!",
        };
      }

      // Se o endereço for encontrado, adiciona os dados do endereço à resposta
      if (endereco) {
        inventory.dataValues.endereco = endereco;
      }

      return inventory;

    } catch (err) {
      return {
        status: false,
        message: "Erro ao exibir o depósito: " + err.message,
      };
    }
  }

  static atualizar(id, inventory) {

    try {
      // chama a funcao isEmpty para verificar se o corpo da requisição está vazio
      if (Validator.isEmpty(inventory)) {
        return {
          status: false,
          message: "O corpo da requisição não pode ser vazio!",
        };
      }

      Depositos.update(inventory, {
        where: {
          id: id,
        },
      });

      return {
        status: true,
        message: "Depósito atualizado com sucesso!",
      }

    } catch (err) {
      return {
        status: false,
        message: err.message,
      };
    }
  }
  

}



module.exports = {
  Deposito
};
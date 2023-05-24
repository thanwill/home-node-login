const {
  Movimentos
} = require("../models");

const Validator = require("./validation");

class Movimento extends Validator {
  constructor(
    tipo,
    quantidade,
    preco_unitario,
    documento,
    subtipo,
    produtos_id,
    estoque_id
  ) {
    super();
    this.id = parseInt();
    this.tipo = tipo; // tipo: entrada ou saída
    this.quantidade = parseInt(quantidade);
    this.preco_unitario = parseFloat(preco_unitario);
    this.documento = documento; // documento: nota fiscal ou ordem de serviço
    this.subtipo = subtipo; // subtipo: compra, venda, devolução, etc
    this.produtos_id = parseInt(produtos_id);
    this.estoque_id = parseInt(estoque_id);
  }

  static async listar() {

    try {
      const movimentos = await Movimentos.findAll();

      if (!movimentos) {
        return {
          status: false,
          message: "Não foi possível encontrar os movimentos!",
        };
      }

      if (movimentos.length === 0) {
        return {
          status: false,
          message: "Não há movimentos cadastrados!",
        };
      }
      return movimentos;
    } catch (error) {
      return {
        status: false,
        message: "Erro ao salvar o depósito: " + error.message,
      };

    }

  }



}

module.exports = {
  Movimento
};
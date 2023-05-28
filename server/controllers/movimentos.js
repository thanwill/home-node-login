const Movimentos = require("../models/movimentoModel");
const {
  Produto
} = require("./produtos");
const {
  Deposito
} = require("./deposito");
const Validator = require("./validation");

class Movimento extends Validator {
  constructor(
    tipo,
    quantidade,
    preco_unitario,
    documento,
    subtipo,
    produto_id,
    estoque_id
  ) {
    super();
    this.id = parseInt();
    this.tipo = tipo; // tipo: entrada ou saída
    this.quantidade = parseInt(quantidade);
    this.preco_unitario = parseFloat(preco_unitario);
    this.documento = documento; // documento: nota fiscal ou ordem de serviço
    this.subtipo = subtipo; // subtipo: compra, venda, devolução, etc
    this.produto_id = parseInt(produto_id);
    this.estoque_id = parseInt(estoque_id);
  }

  // salva um novo movimento
  static async salvar(movimento) {
    console.log(movimento);
    const produto = await Produto.getProduct(movimento.produtos_id);
    const estoque = await Deposito.listarId(movimento.estoque_id);

    if (!produto) {
      return {
        status: false,
        message: "O produto não foi encontrado!",
      };
    }

      
    if (!estoque) {
      return {
        status: false,
        message: "O depósito não foi encontrado!",
      };
    }
    try {

      const newMovimento = await Movimentos.create({
        id: parseInt(),
        tipo: movimento.tipo,
        quantidade: parseInt(movimento.quantidade),
        preco_unitario: parseFloat(movimento.preco_unitario),
        documento: movimento.documento,
        subtipo: movimento.subtipo,
        produto_id: parseInt(movimento.produto_id),
        estoque_id: parseInt(movimento.estoque_id),
      });

      // Se o produto for encontrado, adiciona os dados do produto à resposta
      if (produto) {
        newMovimento.dataValues.produto = produto;
      }

      // Se o estoque for encontrado, adiciona os dados do estoque à resposta
      if (estoque) {
        newMovimento.dataValues.estoque = estoque;
      }

      // se não for possível salvar o movimento
      if (!newMovimento) {
        return {
          status: false,
          message: "Não foi possível salvar o movimento!",
        };
      } else {
        return {
          status: true,
          message: "Movimento cadastrado com sucesso!",
          data: newMovimento
        };
      }
    } catch (err) {
      return {
        status: false,
        message: err.message,
      };
    }
  }

  // lista todos os movimentos
  static async listar() {
    try {
      const movimentos = await Movimentos.findAll();
      return movimentos;
    } catch (err) {
      return {
        status: false,
        message: err.message,
      };
    }
  }

}

module.exports = {
  Movimento
};
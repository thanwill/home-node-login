const { Movimentos } = require("../models");

class Movimento {
    constructor(
      tipo,
      quantidade,
      preco_unitario,
      documento,
      subtipo,
      produtos_id,
      estoque_id
    ) {
      this.id = parseInt();
      this.tipo = tipo; // tipo: entrada ou saída
      this.quantidade = parseInt(quantidade);
      this.preco_unitario = parseFloat(preco_unitario);
      this.documento = documento; // documento: nota fiscal ou ordem de serviço
      this.subtipo = subtipo; // subtipo: compra, venda, devolução, etc
      this.produtos_id = parseInt(produtos_id);
      this.estoque_id = parseInt(estoque_id);
    }
  }

module.exports = {Movimento};
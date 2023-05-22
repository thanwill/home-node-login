class Movements {
  constructor(
    id,
    type,
    quantity,
    price_unitary,
    products,
    createdDate,
    modifiedDate
  ) {
    this.id = id;
    this.type = {
      id: type.id,
      name: type.name,
      description: type.description,
    };
    this.products = [
      {
        id: products.id,
        name: products.name,
        description: products.description,
        quantity: products.quantity,
        price: products.price,
      },
    ];
    this.quantity = quantity;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

class Inventory {
  constructor(
    id,
    name,
    description,
    quantity,
    localidade,
    createdDate,
    modifiedDate
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.localidade = localidade;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

class Products {
  constructor(nome, descricao, quantidade, preco) {
    this.id = parseInt();
    this.nome = nome;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.preco = preco;
  }

  static async createProduct(product) {
    try {
      const product = await Products.create({
        name: this.name,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
      });

      // limita a quantidade de caracteres do nome
      if (this.name.length > 100) {
        return {
          status: false,
          message: "O nome do produto deve ter no máximo 100 caracteres!",
        };
      }

      // limita a quantidade de caracteres da descrição
      if (this.description.length > 500) {
        return {
          status: false,
          message: "A descrição do produto deve ter no máximo 500 caracteres!",
        };
      }

      // trata o preço
      this.price = this.price.replace(",", ".");
      this.price = parseFloat(this.price);

      // verifica se o preço é um número
      if (isNaN(this.price)) {
        return {
          status: false,
          message: "O preço deve ser um número!",
        };
      }

      // verifica se o preço é maior que zero
      if (this.price <= 0) {
        return {
          status: false,
          message: "O preço deve ser maior que zero!",
        };
      }

      // verifica se a quantidade é um número
      if (isNaN(this.quantity)) {
        return {
          status: false,
          message: "A quantidade deve ser um número!",
        };
      }

      // verifica se a quantidade é maior que zero
      if (this.quantity <= 0) {
        return {
          status: false,
          message: "A quantidade deve ser maior que zero!",
        };
      }

      // se não for possível criar o produto
      if (!product) {
        return {
          status: false,
          message: "Não foi possível criar o produto!",
        };
      }

      // retorna o estado e a mensagem
      return {
        status: true,
        message: "Produto criado com sucesso!",
      };
    } catch (err) {
      return err;
    }
  }

  static async listProducts() {
    try {
      const products = await Products.findAll({
        attributes: ["id", "name", "description", "quantity", "price"],
      });

      // se não for possível listar os produtos
      if (!products) {
        return {
          status: false,
          message: "Não foi possível listar os produtos!",
        };
      }

      // retorna os produtos
      return products;
    } catch (err) {
      return err;
    }
  }
}

module.exports = {
  Inventory,
  Products,
  Movements,
};

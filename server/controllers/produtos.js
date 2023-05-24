const Produtos = require("../models/ProdutoModel");

class Produto {
    constructor(nome, descricao) {
      this.nome = nome;
      this.descricao = descricao;
    }
  
    static async validateString(string, min, max) {
      try {
        // se a string for menor que o mínimo
        if (string.length < min) {
          return {
            status: false,
            message: `O campo deve ter no mínimo ${min} caracteres!`,
          };
        }
  
        // se a string estiver vazia
        if (string.length === 0) {
          return {
            status: false,
            message: "O campo não pode estar vazio!",
          };
        }
  
        // não pode conter apenas espaços em branco ou números 
        if (string.trim() === "" || !isNaN(string)) {
          return {
            status: false,
            message: "O campo não pode conter apenas espaços em branco ou números!",
          };
        }
  
        // se a string for maior que o máximo
        if (string.length > max) {
          return {
            status: false,
            message: `O campo deve ter no máximo ${max} caracteres!`,
          };
        }
  
        // se a string estiver dentro dos limites
        return {
          status: true,
          message: "String válida!",
        };
      } catch (err) {
        return err;
      }
    }
  
    static async saveProduct(product) {
      try {
  
        const productExists = await Produtos.findOne({
          where: {
            nome: product.nome,
          },
        });
  
        // cria critérios para validar o nome do produto
        const nameCriteria = {
          name: "nome",
          min: 3,
          max: 50,
        };
  
        // valida o nome do produto
        const nameValidation = await Produto.validateString(
          product.nome,
          nameCriteria.min,
          nameCriteria.max
        );
  
        // se o nome do produto não for válido
        if (!nameValidation.status) {
          return {
            status: false,
            message: nameValidation.message,
          };
        }
  
        // se o produto já existir
        if (productExists) {
          return {
            status: false,
            message: "Produto já cadastrado!",
          };
        }
  
        const newProduct = await Produtos.create({
          id: parseInt(),
          nome: product.nome,
          descricao: product.descricao,
        });
  
        // se não for possível salvar o produto
        if (!newProduct) {
          return {
            status: false,
            message: "Não foi possível salvar o produto!",
          };
        } else {
          return {
            status: true,
            message: "Produto cadastrado com sucesso!",
          };
        }
      } catch (err) {
        return err;
      }
    }
  
    static async listar() {
      try {
        const produtos = await Produtos.findAll();
        return produtos;
      } catch (err) {
        return err;
      }
    }
  
    static async getProduct(id) {
      try {
        const product = await Produtos.findOne({
          where: {
            id: id,
          },
        });
  
        // se o produto não existir
        if (!product) {
          return {
            status: false,
            message: "Produto não encontrado!",
          };
        }
  
        return product;
      } catch (err) {
        return err;
      }
    }
  
  
    static async updateProduct(id, product) {
      try {
        const productExists = await Produtos.findOne({
          where: {
            id: id,
          },
        });
  
        // se o produto não existir
        if (!productExists) {
          return {
            status: false,
            message: "Produto não encontrado!",
          };
        }
  
        const updatedProduct = await Produtos.update({
          nome: product.nome,
          descricao: product.descricao,
        }, {
          where: {
            id: id,
          },
        });
  
        // se não for possível atualizar o produto
        if (!updatedProduct) {
          return {
            status: false,
            message: "Não foi possível atualizar o produto!",
          };
        } else {
          return {
            status: true,
            message: "Produto atualizado com sucesso!",
          };
        }
      } catch (err) {
        return err;
      }
    }
  
    static async deleteProduct(id) {
  
      try {
        const productExists = await Produtos.findOne({
          where: {
            id: id,
          },
        });
  
        // se o produto não existir
        if (!productExists) {
          return {
            status: false,
            message: "Produto não encontrado!",
          };
        }
  
        const deletedProduct = await Produtos.destroy({
          where: {
            id: id,
          },
        });
  
        // se não for possível deletar o produto
        if (!deletedProduct) {
          return {
            status: false,
            message: "Não foi possível deletar o produto!",
          };
        } else {
          return {
            status: true,
            message: "Produto deletado com sucesso!",
          };
        }
  
      } catch (error) {
        return error;
      }
    }
  
  }

  module.exports = {Produto};
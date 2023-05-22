const express = require("express");
const router = express.Router();
const { Products } = require("../controllers/estoque");

// Defina as rotas para o estoque
router.get("/estoque", (req, res) => {
  res.send("Rota do estoque");
});

// Cadastra um novo produto
router.post("/produtos", async (req, res) => {
  try {
    const produto = await Products.saveProduct(req.body);
    return res.json(produto);
  } catch (err) {

    // exibe o erro que vem do sequelize 

    console.error(err.message);

    return res.status(500).send(`${err.message}`);
  }
});

// Lista todos os produtos
router.get("/produtos", async (req, res) => {
  try {
    const produtos = await Products.listProducts();
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produtos, null, 2)); // 2 é o número de espaços na indentação do JSON
  } catch (err) {
    console.error(err);
    // mostra o motivo do erro para o cliente 
    res.status(500).send(`${err}`);

  }
});

// Atualiza um produto pelo id
router.put("/produtos/:id", async (req, res) => {
  try {
    const produto = await Products.updateProduct(req.params.id, req.body);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// Deleta um produto pelo id
router.delete("/produtos/:id", async (req, res) => {
  try {
    const produto = await Products.deleteProduct(req.params.id);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// cria uma rota para previnir erros no api
router.get("*", (req, res) => {
  res.status(404).send("Esta rota não existe!");
});

module.exports = router;

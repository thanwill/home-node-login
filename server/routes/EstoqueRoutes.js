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
    const produto = await Products.createProduct(req.body);
    return res.json(produto);
  } catch (err) {
    return res.status(500).send(`${err}`);
  }
});

// Lista todos os produtos
router.get("/produtos", async (req, res) => {
  try {
    const produtos = await Products.listProducts();
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produtos, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

module.exports = router;

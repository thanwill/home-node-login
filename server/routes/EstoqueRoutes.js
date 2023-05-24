const express = require("express");
const router = express.Router();
const { Deposito} = require("../controllers/deposito");
const { Produto } = require("../controllers/produtos");

// Defina as rotas para o estoque
router.get("/estoque", (req, res) => {
  res.send("Rota do estoque");
});

// Cadastra um novo produto
router.post("/produtos", async (req, res) => {
  try {
    const produto = await Produto.salvar(req.body);
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
    const produtos = await Produto.listar();
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produtos, null, 2)); // 2 é o número de espaços na indentação do JSON
  } catch (err) {
    console.error(err);
    // mostra o motivo do erro para o cliente 
    res.status(500).send(`${err}`);

  }
});

// Lista um produto pelo id
router.get("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.getProduct(req.params.id);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// Atualiza um produto pelo id
router.put("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.atualizar(req.params.id, req.body);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// Deleta um produto pelo id
router.delete("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.deletar(req.params.id);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// cadastra um novo estoque Invetory
router.post('/depositos', async (req, res) => {
  try {
    const deposito = await Deposito.salvar(req.body);
    console.log(deposito);
    return res.json(deposito);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(`${err.message}`);
  }
});

// lista os depositos
router.get('/depositos', async (req, res) => {
  try {
    const depositos = await Deposito.listar();
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(depositos, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

// lista um deposito pelo id
router.get('/deposito/:id', async (req, res) => {
  try {
    const deposito = await Deposito.listarId(req.params.id);
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(deposito, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

// atualiza um deposito pelo id
router.put('/deposito/:id', async (req, res) => {
  try {
    const deposito = await Deposito.atualizar(req.params.id, req.body);
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(deposito, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});


module.exports = router;

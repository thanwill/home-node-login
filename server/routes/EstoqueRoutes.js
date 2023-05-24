const express = require("express");
const router = express.Router();
const { Deposito} = require("../controllers/deposito");
const { Produto } = require("../controllers/produtos");
const { Endereco } = require("../controllers/enderecos");
// Defina as rotas para o estoque
router.get("/estoque", (req, res) => {
  res.send("Rota do estoque");
});

// Cadastra um novo produto
router.post("/produtos", async (req, res) => {
  try {
    const produto = await Produto.saveProduct(req.body);
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
    const produto = await Produto.updateProduct(req.params.id, req.body);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// Deleta um produto pelo id
router.delete("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.deleteProduct(req.params.id);
    res.setHeader("Content-Type", "routerlication/json");
    res.status(200).send(JSON.stringify(produto, null, 2));
  } catch (err) {
    res.status(500).send(`${err}`);
  }
});

// cadastra um novo estoque Invetory
router.post('/depositos', async (req, res) => {
  try {
    const deposito = await Deposito.criarDeposito(req.body);
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
    const depositos = await Deposito.listarDeposito();
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(depositos, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

// cadastra um novo endereço
router.post('/enderecos', async (req, res) => {
  try {
    const endereco = await Endereco.salvar(req.body);
    return res.json(endereco);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(`${err.message}`);
  }
});

// lista os endereços cadastrados por id
router.get('/enderecos/:id', async (req, res) => {
  try {
    const endereco = await Endereco.getEndereco(req.params.id);
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(endereco, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

// lista os endereços cadastrados 
router.get('/enderecos', async (req, res) => {
  try {
    const enderecos = await Endereco.listar();
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(enderecos, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

// cria uma rota para previnir erros no api
router.get("*", (req, res) => {
  res.status(404).send("Esta rota não existe!");
});

module.exports = router;

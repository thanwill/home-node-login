const express = require("express");
const router = express.Router();
const {
  Endereco
} = require("../controllers/enderecos");

router.get("/endereco", (req, res) => {
  res.send("Rota do endereço");
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
router.get('/endereco/:id', async (req, res) => {
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

// atualiza um endereço por id
router.put('/endereco/:id', async (req, res) => {
  try {
    const endereco = await Endereco.atualizar(req.params.id, req.body);
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(endereco, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});

// deleta um endereço por id
router.delete('/endereco/:id', async (req, res) => {
  try {
    const endereco = await Endereco.deletar(req.params.id);
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(endereco, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
});


module.exports = router;
const express = require('express');
const router = express.Router();
const Users = require('../controllers/users');
const auth = require('../controllers/autentication');

router.get('/', (req, res) => {
  return res.send('<h1>Olá, mundo!</h1>');
});

router.post('/teste', (req, res) => {

  // converte em texto o corpo da requisição
  const {
      nome,
      email
  } = req.body;

  console.log(nome, email)
  // retorna o texto convertido
  return res.send(`<h1>Olá ${nome}! Seu email é ${email}</h1>`);
})

router.get('/listar', async (req, res) => {
  try {
      const users = await Users.getAllUsers();
      res.setHeader('Content-Type', 'routerlication/json');
      res.status(200).send(JSON.stringify(users, null, 2));
  } catch (err) {
      console.error(err);
      res.status(500).send(`${err}`);
  }
})


router.post('/cadastrar', async (req, res) => {

  try {
      const {
          nome,
          email,
          senha,
          confirmaSenha,
          nascimento
      } = req.body;

      const user = new Users({
          nome,
          email,
          senha,
          confirmaSenha,
          nascimento
      });

      await user.save();
      

      return res.json(user);
  } catch (err) {
      console.error(err);
      res.status(500).send(`${err}`);
  }

})

router.post('/login', async (req, res) => {

  const {
      email,
      password
  } = req.body;

  const user = await auth.autentication({
      email,
      password
  });

  return res.json(user);
});

router.delete('/deletar', async (req, res) => {
  const user = await auth.deleteAll();
  return res.json(user);
});

router.delete('/deletar/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await auth.deleteById(id);
  return res.json(user);
});

module.exports = router;

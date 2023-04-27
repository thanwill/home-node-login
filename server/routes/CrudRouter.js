const express = require('express');
const router = express.Router();
const { Users, Administrador, Cliente } = require('../controllers/users');
const auth = require('../controllers/autentication');

router.get('/', (req, res) => {
  return res.send('<h1>Olá, mundo!</h1>');
});


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

router.get('/listar/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.getUserById(id);
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`${err}`);
  }

});

router.delete('/deletar/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Administrador.deleteUser(id);
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`${err}`);
  }
});

module.exports = router;
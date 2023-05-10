const express = require('express');
const router = express.Router();
const { Usuario, Administrador } = require('../controllers/users');
const auth = require('../controllers/autentication');

router.get('/', (req, res) => {
  return res.send('<h1>Olá, mundo!</h1>');
});


router.get('/listar', async (req, res) => {
  try {
    const users = await Usuario.getAllUsers();
    res.setHeader('Content-Type', 'routerlication/json');
    res.status(200).send(JSON.stringify(users, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).send(`${err}`);
  }
})

router.post('/cadastrar', async (req, res) => {

  try{
    console.log(req.body);
    const user = await Usuario.save(req.body);
    return res.json(user);

  }catch(err){
    return res.status(500).send(`${err}`);
  }

})

router.post('/login', async (req, res) => {

  const {
    email,
    senha
  } = req.body;

  const user = await auth.autentication({
    email,
    senha
  });

  return res.json(user);
});

router.get('/listar/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Usuario.getUserById(id);
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`${err}`);
  }

});

// recuperar senha 
router.post('/recuperar-senha', async (req, res) => {

  const {
    email
  } = req.body;

  try {
    const newPassword = await Usuario.recoverPassword(email);
    return res.json(newPassword);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`${err}`);
  }

});

router.delete('/deletar/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Administrador.deletarUsuario(id);
    // lança uma resposta de confirmação
    return res.json("Usuário deletado com sucesso!");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`${err}`);
  }
});

module.exports = router;
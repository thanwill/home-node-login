const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const port = 3001;
const app = express();
const bodyPerser = require('body-parser');

app.use(express.json()); // usado para converter o corpo da solicitação em JSON
app.use(cors()); // usado para permitir que o servidor seja acessado por outros domínios
app.use(bodyPerser.json());

app.get('/', (req, res) => {
    return res.json({
        message: 'Olá mundo!'
    });
});

app.post('/teste', (req, res) => {

    // converte em texto o corpo da requisição
    const {
        nome,
        email
    } = req.body;

    console.log(nome, email)
    // retorna o texto convertido
    return res.send(`<h1>Olá ${nome}! Seu email é ${email}</h1>`);
})

app.get('/listar', async (req, res) => {
    const users = await auth.list();
    return res.json(users);
})


app.post('/cadastrar', async (req, res) => {

    const {
        nome,
        email,
        senha,
        nascimento
    } = req.body;

    const user = await auth.create({
        nome,
        email,
        senha,
        nascimento
    });

    return res.json(user);

})

app.post('/login', async (req, res) => {

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

app.delete('/deletar', async (req, res) => {
    const user = await auth.deleteAll();
    return res.json(user);
});

app.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = await auth.deleteById(id);
    return res.json(user);
});


app.listen(port, () => {
    console.log(`O aplicativo está rodando em http://localhost:${port}`);
});
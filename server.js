const express = require('express');
const cors = require('cors');
const auth = require('./auth');
const port = 3001;
const app = express();

app.use(express.json()); // usado para converter o corpo da solicitação em JSON
app.use(cors()); // usado para permitir que o servidor seja acessado por outros domínios

app.get('/', (req, res) => {
    res.render('http://localhost:3000/');
});

app.get('/',(req, res) => {
    console.log('Bem-vindo!');
});

app.post('/login', (req,res) => {
    console.log(req.body);
    const user = req.body;
    auth.autentication(user);
    res.send(user);
});

app.listen(port, () => {
    console.log(`O aplicativo está rodando em http://localhost:${port}`);
});
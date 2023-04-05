const users = require('./data');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = 3001;
const path = require('path');
const app = express();
const cors = require('cors');

app.use(session({
    secret: 'secret', // secret é usado para assinar o cookie de sessão, para que ele não possa ser alterado.
    resave: true, // rasave é usado para determinar se a sessão deve ser salva em cada solicitação.
    saveUninitialized: true // saveUninitialized é usado para determinar se uma sessão nova deve ser salva em cada solicitação.
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); // usado para converter o corpo da solicitação em JSON
app.use(cors()); // usado para permitir que o servidor seja acessado por outros domínios
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); // usado para definir o motor de visualização
app.use('/public', express.static(path.join(__dirname, 'public'))); // usado para definir o caminho da pasta public
app.set('views', path.join(__dirname, 'views')); // usado para definir o caminho da pasta views

app.get('/', (req, res) => {
    res.render('http://localhost:3000/');
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // percorre o array de usuários e verifica se o usuário e a senha estão corretos
    const user = users.find(user => user.username === username && user.password === password);

    // se o usuário e a senha estiverem corretos, cria uma sessão para o usuário
    try {
        if (user && user.password === password) {
            req.session.loggedin = true;
            req.session.username = username;
            console.log(req.session);
            res.status(200).json({
                message: 'Usuário autenticado com sucesso!'
            });
        } else {
            console.log('Usuário ou senha incorretos!');
            res.status(401).json({
                message: 'Usuário ou senha incorretos!'
            });
        }
    }catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`O aplicativo está rodando em http://localhost:${port}`);
});
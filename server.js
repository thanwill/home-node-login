const auth = require('./auth');
const session = require('express-session');

const express = require('express');
const bodyParser = require('body-parser');

const port = 3001;
const app = express();
const cors = require('cors');
const path = require('path');

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

app.post('/login', async (req, res) => {
    const user = await auth.autentication(req.body);
    if(user.auth){
        req.session.user = user;
        res.status(200).json(user);
    }
    else{
        res.status(401).json(user);
    }
});

app.listen(port, () => {
    console.log(`O aplicativo está rodando em http://localhost:${port}`);
});
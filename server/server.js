const express = require('express');
const cors = require('cors');
const port = 3001;
const app = express();
const bodyPerser = require('body-parser');
const crud = require('./routes/CrudRouter');
app.use(express.json()); // usado para converter o corpo da solicitação em JSON
app.use(cors()); // usado para permitir que o servidor seja acessado por outros domínios
app.use(bodyPerser.json());

// sincronizacao com o banco de dados
(async () => {
    const database = require('./models/database');
    try {
        
        const Users = require('./models/UserModel');
        const Locality = require('./models/LocalityModel');
        await database.sync();
        console.log('Conectado ao banco de dados com sucesso!');
    } catch (err) {
        console.error('Não foi possível conectar ao banco de dados:', err);
    }
})();

app.use('/', crud);

app.listen(port, () => {
    console.log(`O aplicativo está rodando em http://localhost:${port}`);
});
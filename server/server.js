/* eslint-disable no-unused-vars */
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;


const bodyPerser = require("body-parser");
const UserRoutes = require("./routes/UsuarioRoutes");
const ProductRoutes = require("./routes/EstoqueRoutes");
const EnderecoRoutes = require("./routes/EnderecoRoutes");

app.use(express.json()); // usado para converter o corpo da solicitação em JSON
app.use(cors()); // usado para permitir que o servidor seja acessado por outros domínios
app.use(bodyPerser.json());

// sincronizacao com o banco de dados
(async () => {
  const database = require("./models/DatabaseModel");
  const Produtos = require("./models/ProdutoModel");
  const Movimentos = require("./models/movimentoModel");
  const Endereco = require("./models/EnderecosModel");
  const Usuarios = require("./models/UserModel");

  try {
    await database.sync();
    console.log("Conectado ao banco de dados com sucesso!");
  } catch (err) {
    console.error("Não foi possível conectar ao banco de dados:", err);
  }
})();

app.use("/", UserRoutes); // rota para o usuário
app.use("/", ProductRoutes); // rota para o estoque
app.use("/", EnderecoRoutes); // rota para o endereço

// cria uma rota para previnir erros no api
app.get("*", (req, res) => {
  res.status(404).send("Esta rota não existe!");
});

app.listen(port, () => {
  console.log(`O aplicativo está rodando em http://localhost:${port}`);
});

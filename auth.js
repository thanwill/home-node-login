const jwt = require('jsonwebtoken');
require('dotenv');
const users = require('./data');

async function autentication(req){
    const username = req.username;
    const password = req.password;
    // percorre o array de usuários e verifica se o usuário e a senha estão corretos
    const usuario = users.find(user => user.username === username && user.password === password);
    let user = {};
    if(usuario){
        

        const id = user.id;
        const token = jwt.sign({id},process.env.SECRET, {
            expiresIn:300
        }
        );
        user.auth = true;
        user.token = token;
    }
    else{
        user.auth = false;
        user.token = '';
    }
    return user;
}

//Desconecta o usuário
async function logout(user){
    user.auth = false;
    user.token = null;
    return user;
}

//Verifica o token
async function verifyToken_(req, res, next){
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).json({auht:false, message:'Token not provided'});
    jwt.verify(token,process.env.SECRET, (err) => {
        if(err) {
            return res.status(401).json({auth:false, message:'Faild to authenticate token'});
        }
        next();
    });
}

module.exports = {
    autentication, 
    logout,
    verifyToken_
  };
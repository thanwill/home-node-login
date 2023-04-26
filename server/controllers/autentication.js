const jwt = require('jsonwebtoken');
require('dotenv').config();
require('../models/database');
const User = require('../models/UserModel');

async function autentication(newUser) {

    const {
        email,
        password
    } = newUser;

    // verifica se o usuário existe

    const user = await User.findOne({
        where: {
            email: email,
            password: password
        }
    });

    try{
        if (!user) {
            throw new Error('Usuário não encontrado!');           
        }

        const id = user.id;
        const token = jwt.sign({
            id
        }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });

        return {
            auth: true,
            token: token
        };
        
    }catch(err){
        return {
            auth: false,
            message: err.message
        };
    }

}

async function verifyJWT(req, res, next) {

    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'Nenhum token fornecido.'
        });
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            return res.status(500).json({
                auth: false,
                message: 'Falha ao autenticar o token.'
            });
        }

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
    });



}

module.exports = {
    autentication,
    verifyJWT
};
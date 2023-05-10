require('dotenv').config();
require('../models/database');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

async function autentication(usuario) {
    try {
        const {
            email,
            senha
        } = usuario;

        const user = await User.findOne({
            where: {
                email
            }
        });

        // lança um erro se o email não estiver cadastrado
        if (!user) {
            console.log('Email não cadastrado!');
        } else {
            bcrypt.compare(senha, user.senha, function (err, result) {
                if (err) {
                    throw err;
                } else if (result === true) {
                    console.log('Senha correta!');
                    return true;
                } else {
                    console.log('Senha incorreta!');
                    return false;
                }
            });
            const confirmacao = await bcrypt.compare(senha, user.senha);
            if (confirmacao) {
                const id = user.id;
                const token = jwt.sign({
                    id
                }, process.env.JWT_SECRET, {
                    expiresIn: 300 // expires in 5min
                });
                return {
                    auth: true,
                    token: token
                };

            } else {
                return {
                    auth: false,
                    message: `Falha ao autenticar o usuário.`
                }
            }

        }
    } catch (err) {
        throw err;
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
const usuarios = require('./data');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function autentication(user) {

    try {

        const email = user.email.toString();
        const password = user.password.toString();

        let newuser = usuarios.find(usuario => email === usuario.email && password === usuario.password);

        if (newuser) {
            const id = newuser.id;
            const token = jwt.sign({
                id
            }, process.env.SECRET, {
                expiresIn: 300
            });

            return {
                id : id,
                auth : true,
                token : token
            };
        } else {
            throw new Error('Usuário não encontrado');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    autentication
};
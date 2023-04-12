const jwt = require('jsonwebtoken');
require('dotenv').config();

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch'); // 

async function list() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.map(u => omitPassword(u));
}

async function create(newUser) {

    const nome = newUser.nome.toString();
    const email = newUser.email.toString();
    const senha = newUser.senha.toString();
    const nascimento = newUser.nascimento.toString();

    // Verifica se o usuário já existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (user) {
        console.log(`Usuário já existe: ${JSON.stringify(user.nome)}`);
        return user;
    } else {
        // Cria um novo usuário
        const newUser = {
            id: users.length + 1,
            nome,
            email,
            senha,
            nascimento,
            createdDate: new Date(),
            modifiedDate: new Date()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(`Usuário ${newUser.nome} criado com sucesso!`)
        return list();
    }
}

function omitPassword(user) {
    const {
        password,
        ...userWithoutPassword
    } = user;
    return userWithoutPassword;
}

async function deleteById(id) {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users.filter(u => u.id !== id);
    localStorage.setItem('users', JSON.stringify(users));
    return list();
}

async function autentication(newUser) {

    const {
        email,
        senha
    } = newUser;

    // Verifica se o usuário existe
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.senha === senha);

    if (user === undefined) {
        console.log(`Usuário não encontrado`);
        return {
            auth: false,
            token: null
        };
    } else {
        const id = user.id;
        const token = jwt.sign({
            id
        }, process.env.SECRET, {
            expiresIn: 300
        });

        return {
            id: id,
            auth: true,
            token: token
        };
    }

}

async function deleteAll() {
    localStorage.clear();
    return list();
}

module.exports = {
    autentication,
    create,
    list,
    deleteById,
    deleteAll
};

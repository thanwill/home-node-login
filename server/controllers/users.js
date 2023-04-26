const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const {
    v4: uuidv4
} = require('uuid');

class User {

    constructor({
        nome,
        email,
        senha,
        confirmaSenha,
        nascimento
    }) {

        this.id = uuidv4();
        this.name = nome;
        this.email = email;
        this.senha = senha;
        this.csenha = confirmaSenha;
        this.birthday = nascimento;
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }

    static getAllUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        return users.map(u => User.omitPassword(u));
    }

    static createUser(user) {
        const users = User.getAllUsers();

        const regexMail = '[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?';

        try {
            if (!user.name || user.name.length < 3) throw new Error('Nome deve conter no mínimo 3 caracteres');
            if (!user.email || !user.email.match(regexMail)) throw new Error('Email inválido');
            if (!user.senha || user.senha.length < 6) throw new Error('Senha deve conter no mínimo 6 caracteres');
            if (!user.csenha || user.csenha !== user.senha) throw new Error('Confirmação de senha inválida');
            if (!user.birthday) throw new Error('Data de nascimento inválida');

            const userExists = users.find(u => u.email === user.email);
            if (userExists) throw new Error('Email já cadastrado');

            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = User;
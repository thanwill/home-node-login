const Users = require('../models/UserModel');
const Locality = require('../models/LocalityModel');
const moment = require('moment');

const {
    v4: uuidv4
} = require('uuid');

class User {

    constructor({
        nome,
        email,
        senha,
        confirmaSenha,
        nascimento,
        cpf,
        type = {
            cliente: false,
            administrador: false
        },
        endereco = []
    }) {
        this.id = uuidv4();
        this.name = nome;
        this.email = email;
        this.password = senha;
        this.cpassword = confirmaSenha;
        this.birthday = moment(nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        this.cpf = cpf;
        this.type = type;
        this.endereco = endereco
    }

    static getAllUsers() {
        const users = Users.findAll();
        return users;
    }

    static async getUserById(id) {

        try {
            const user = await Users.findByPk(id);
            return user;
        } catch (err) {
            console.error(err);
            return err;
        }

    }

    // atualiza o email do usuario
    static async updateEmail(id, email) {

        // verifica se o email já está cadastrado
        const userExists = await Users.findOne({
            where: {
                email: this.email
            }
        });

        if (!userExists) {
            throw new Error('O email não está cadastrado!');
        }

        try {

            !this.findByPk(id) ? console.log('Usuário não encontrado!') : await Users.update({
                email: email
            }, {
                where: {
                    id: id
                }
            });

        } catch (err) {
            console.error(err);
            return err;
        }
    }

    static async createAddress(endereco) {
        try {
            const address = await Locality.create({
                street: endereco.street,
                number: endereco.number,
                complement: endereco.complement,
                neighborhood: endereco.neighborhood,
                city: endereco.city,
                state: endereco.state,
                country: endereco.country,
                zip_code: endereco.zip_code
            });
            return address;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    static async updateAdress(id, endereco) {

        try {

            !this.findByPk(id) ? console.log('Usuário não encontrado!') : await Users.update({
                endereco: endereco
            }, {
                where: {
                    id: id // procura pelo id do usuario no banco de dados e atualiza o endereco do usuario com o endereco passado como parametro
                }
            });

        } catch (err) {
            console.error(err);
            return err;
        }
    }

}

class Administrador extends User {
    constructor(nome, email, senha, cargo) {
        super(nome, email, senha);
        this.cargo = cargo;
    }

    // cria um novo usuario e salva no banco de dados
    static async criarUsuario() {

        const regexMail = /\S+@\S+\.\S+/;
        if (!this.email.match(regexMail)) {
            throw new Error('O email é inválido!');
        }

        // verifica se o email já está cadastrado
        const userExists = await Users.findOne({
            where: {
                email: this.email
            }
        });

        if (userExists) {
            throw new Error('O email já está cadastrado!');
        }

        if (!this.name) {
            throw new Error('O nome é obrigatório!');
        }

        if (!this.email) {
            throw new Error('O email é obrigatório!');
        }

        if (!this.password) {
            throw new Error('A senha é obrigatória!');
        }

        if (!this.cpassword) {
            throw new Error('A confirmação da senha é obrigatória!');
        }

        try {
            const user = await Users.create({
                id: this.id,
                name: this.name,
                email: this.email,
                password: this.password,
                cpassword: this.cpassword,
                birthday: this.birthday,
                createdDate: this.createdDate,
                modifiedDate: this.modifiedDate
            });
            console.log('Usuário criado com sucesso!');
            console.log(user);

            return user;
        } catch (err) {
            console.error(err);
            return err;
        }
    }
    static async deletarUsuario(id) {

        try {
            const user = await Users.findByPk(id);
            await user.destroy();
            return user;
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}

class Cliente extends User {

    constructor() {

    }

    fazerPedido() {
        // implementação do método fazerPedido específico para clientes
    }
}

module.exports = {
    User,
    Cliente,
    Administrador
};
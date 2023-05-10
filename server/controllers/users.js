const User = require('../models/UserModel');
const Address = require('../models/AddressModel');

const {
    v4: uuidv4
} = require('uuid');

class Usuario {

    constructor(name, email, password, cpassword, birthday, cpf) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpassword = cpassword;
        this.birthday = birthday;
        this.cpf = cpf;
        this.type = 1;

    }

    static async save(user) {
        try {

            // trata a data antes de mandar para o banco de dados 
            const birthday = new Date(user.birthday).toLocaleDateString("en-CA");
            console.log(birthday);

            // verifica se o email já está cadastrado
            const userExists = await User.findOne({
                where: {
                    email: user.email
                }
            });

            if (userExists) {
                throw new Error('Email já cadastrado');
            }

            // verifica se o cpf já está cadastrado

            const cpfExists = await User.findOne({
                where: {
                    cpf: user.cpf
                }
            });

            if (cpfExists) {
                throw new Error('CPF já cadastrado');
            }

            // verifica se a senha e a confirmação de senha são iguais

            if (user.password !== user.cpassword) {
                throw new Error('As senhas não são iguais');
            }

            // cria o usuario no banco de dados

            const newUser = await User.create({
                id: uuidv4(),
                name: user.name,
                email: user.email,
                password: user.password,
                birthday: birthday,
                cpf: user.cpf,
                type: user.type
            });

            return newUser;


        } catch (err) {
            console.error(err);
            throw err; // lança o erro para quem chamou a função
          }
          
    }

    static async getAllUsers() {
        const users = User.findAll();
        return users;
    }

    static async getUserById(id) {

        try {
            const user = await User.findByPk(id);
            return user;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    // atualiza o email do usuario
    static async updateEmail(id, email) {

        // verifica se o email já está cadastrado
        const userExists = await User.findOne({
            where: {
                email: this.email
            }
        });

        if (!userExists) {
            throw new Error('O email não está cadastrado!');
        }

        try {

            !this.findByPk(id) ? console.log('Usuário não encontrado!') : await User.update({
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
            const address = await Address.create({
                endereco: endereco
            });
            return address;
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    static async updateAdress(id, endereco) {

        try {

            !this.findByPk(id) ? console.log('Usuário não encontrado!') : await User.update({
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

    static async delete(id) {

        try {

            !this.findByPk(id) ? console.log('Usuário não encontrado!') : await User.destroy({
                where: {
                    id: id
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
        const userExists = await User.findOne({
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
            const user = await User.create({
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
            const user = await User.findByPk(id);

            if (!user) {
                throw new Error('Usuário não encontrado!');
            }

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
    Usuario,
    Administrador,
    Cliente
};
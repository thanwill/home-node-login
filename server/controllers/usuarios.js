const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

class Usuario {

    constructor(nome, email, senha, csenha, nascimento, cpf) {
        this.id = parseInt();
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.csenha = csenha;
        this.nascimento = nascimento;
        this.cpf = cpf;
    }

    static async save(user) {
        try {
            const birthday = new Date(user.nascimento);
            const formattedBirthday = birthday.toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).split('/').reverse().join('-');
            user.nascimento = formattedBirthday;

            // verifica se o email já está cadastrado
            const userExists = await User.findOne({
                where: {
                    email: user.email
                }
            });

            // verifica se o cpf já está cadastrado
            const cpfExists = await User.findOne({
                where: {
                    cpf: user.cpf
                }
            });

            if (userExists) {
                throw new Error('Email já cadastrado');
            }
            if (cpfExists) {
                throw new Error('CPF já cadastrado');
            }

            if (user.senha !== user.csenha) {
                throw new Error('As senhas não são iguais');
            }

            // cria uma hash para a senha
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.senha, saltRounds);

            const newUser = await User.create({
                id: parseInt(),
                nome: user.nome,
                email: user.email,
                senha: hash,
                nascimento: user.nascimento,
                cpf: user.cpf,
                tipo: 1
            });

            return newUser; // retorna o novo usuario

        } catch (err) {
            throw err; // lança o erro para quem chamou a função
        }
    }

    static async getAllUsers() {
        try {
            const users = await User.findAll();

            if (!users) {
                return {
                    status: false,
                    message: "Não foi possível encontrar os usuários",
                };
            }

            return users;

        } catch (err) {
            throw err;
        }
    }

    // funçao para recuperar senha por email
    static async recoverPassword(email) {

        // verifica se o email já está cadastrado

        const userExists = await User.findOne({
            where: {
                email: email
            }
        });

        if (!userExists) {
            throw new Error('O email não está cadastrado!');
        }

        try {

            const newPassword = Math.random().toString(36).slice(-8);
            const saltRounds = 10;
            const hash = await bcrypt.hash(newPassword, saltRounds);
            await User.update({
                senha: hash
            }, {
                where: {
                    email: email
                }
            });
            return newPassword;

        } catch (err) {
            throw err;
        }
    }

    static async getUserById(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return {
                    status: false,
                    message: "Usuário não encontrado!"
                }
            }
            return user;
        } catch (err) {
            console.error(err);
            return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
        }
    }

    // atualiza o email do usuario
    static async updateEmail(id, email) {

        // verifica se o email já está cadastrado e se o usuario existe

        const userExists = await User.findOne({
            where: {
                email: email
            }
        });


        if (userExists) {
            return {
                status: false,
                message: "O email já está cadastrado!"
            }
        }

        // verifica se o usuario existe
        const user = await User.findByPk(id);

        if (!user) {
            return {
                status: false,
                message: "Usuário não encontrado!"
            }
        }

        try {

            await User.update({
                email: email
            }, {
                where: {
                    id: id
                }
            });

        } catch (err) {
            throw err;
        }
    }

    static async updateAdress(id, endereco) {

        try {

            !this.findByPk(id) ? console.log('Usuário não encontrado!') : await User.update({
                endereco: endereco
            }, {
                where: {
                    id: id
                }
            });

        } catch (err) {
            console.error(err);
            return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
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
            return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
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
            return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
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
            return {
        status: false,
        message: "Erro ao salvar o depósito: " + err.message,
      };
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
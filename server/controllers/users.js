const Users = require('../models/UserModel');
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
        nascimento
    }) {

        this.id = uuidv4();
        this.name = nome;
        this.email = email;
        this.password = senha;
        this.cpassword = confirmaSenha;
        this.birthday = moment (nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        this.createdDate = new Date();
        this.modifiedDate = new Date();
    }

    static getAllUsers() {
        const users = Users.findAll();
        return users;        
    }

    // cria um novo usuario e salva no banco de dados
    async save() {
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

}



module.exports = User;
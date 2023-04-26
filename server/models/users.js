const { v4: uuidv4 } = require('uuid');

class User {

    constructor ({nome, email, senha, confirmaSenha,nascimento}){

        this.id = uuidv4();
        this.name = nome;
        this.email = email;
        this.senha = senha;
        this.csenha = confirmaSenha;
        this.birthday = nascimento;
        this.createdDate = new Date();
        this.modifiedDate = new Date();        
    }

    static getAllUsers(){
        
    }





}
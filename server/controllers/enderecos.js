const Enderecos = require('../models/EnderecosModel');

class Endereco {

    constructor(rua, numero, complemento, bairro, cidade, estado, pais, cep, user_id) {
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.cep = cep;
    }

    static async salvar(endereco) {

        try {
            const NovoEndereco = await Enderecos.create({
                id: parseInt(),
                rua: endereco.rua,
                numero: endereco.numero,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                pais: endereco.pais,
                cep: endereco.cep,
                user_id: endereco.user_id
            });

            return NovoEndereco;

        } catch (err) {
            throw new Error(`${err}`);
        }
    }
    
    static async getEndereco(id) {
        try {
            const endereco = await Enderecos.findOne({
                where: {
                    id: id
                }
            });
            return endereco;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    static async listar(){
        try {
            const endereco = await Enderecos.findAll();
            return endereco;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}
module.exports = {Endereco};
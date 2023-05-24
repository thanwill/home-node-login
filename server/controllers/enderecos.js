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
                cep: endereco.cep
            });

            // verifica se o nome da rua e o numero do endereço já existe
            const enderecoExiste = await Enderecos.findOne({
                where: {
                    rua: endereco.rua,
                    numero: endereco.numero
                }
            });

            if (enderecoExiste) {
                return {
                    status: false,
                    message: "Endereço já cadastrado!"
                }
            }

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

            if (!endereco) {
                return {
                    status: false,
                    message: "Endereço não encontrado!"
                }
            } else {
                return endereco;
            }

        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    static async listar() {
        try {
            const endereco = await Enderecos.findAll();

            // se for vazio retorna uma mensagem
            if (endereco.length === 0) {
                return {
                    status: false,
                    message: "Nenhum endereço cadastrado!"
                }
            }

            return endereco;
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    static async atualizar(id, endereco) {
        try {

            // verifica se os campos estão vazios
            if (endereco.rua === "" || endereco.numero === "" || endereco.bairro === "" || endereco.cidade === "" || endereco.estado === "" || endereco.pais === "" || endereco.cep === "") {
                return {
                    status: false,
                    message: "Preencha todos os campos!"
                }
            }

            // verifica se os campos são undefined
            if (endereco.rua === undefined || endereco.numero === undefined || endereco.bairro === undefined || endereco.cidade === undefined || endereco.estado === undefined || endereco.pais === undefined || endereco.cep === undefined) {
                return {
                    status: false,
                    message: "Preencha todos os campos!"
                }
            }

            // verifica se o endereço existe
            const enderecoExiste = await Enderecos.findOne({
                where: {
                    id: id
                }
            });

            if (!enderecoExiste) {
                return {
                    status: false,
                    message: "Endereço não encontrado!"
                }
            }

            // verifica se o nome da rua e o numero do endereço já existe
            const enderecoExiste2 = await Enderecos.findOne({
                where: {
                    rua: endereco.rua,
                    numero: endereco.numero
                }
            });

            if (enderecoExiste2) {
                return {
                    status: false,
                    message: "Endereço já cadastrado!"
                }
            }

            // atualiza o endereço
            const enderecoAtualizado = await Enderecos.update({
                rua: endereco.rua,
                numero: endereco.numero,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                estado: endereco.estado,
                pais: endereco.pais,
                cep: endereco.cep
            }, {
                where: {
                    id: id
                }
            })

            // se não for possível atualizar o endereço
            if (!enderecoAtualizado) {
                return {
                    status: false,
                    message: "Não foi possível atualizar o endereço!"
                }
            } else {
                return {
                    status: true,
                    message: "Endereço atualizado com sucesso!"
                }
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    static async deletar(id) {
        try {
            const enderecoDeletado = await Enderecos.destroy({
                where: {
                    id: id
                }
            });

            if (!enderecoDeletado) {
                return {
                    status: false,
                    message: "Endereço não encontrado!"
                }
            } else {
                return {
                    status: true,
                    message: "Endereço deletado com sucesso!"
                }
            }
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}
module.exports = {
    Endereco
};
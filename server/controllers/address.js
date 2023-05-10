class Address {

    constructor(id, rua, numero, complemento, bairro, cidade, estado, pais, cep, user_id) {
        this.id = id;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
        this.cep = cep;        
        this.user_id = user_id;
    }

}

module.exports = Address;
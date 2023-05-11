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

    static async save(address) {

        try {
            const newAddress = await Address.create({
                id: parseInt(),
                rua: address.rua,
                numero: address.numero,
                complemento: address.complemento,
                bairro: address.bairro,
                cidade: address.cidade,
                estado: address.estado,
                pais: address.pais,
                cep: address.cep,
                user_id: address.user_id
            });

            return newAddress;

        } catch (err) {
            throw new Error(`${err}`);
        }
    }

}

module.exports = Address;
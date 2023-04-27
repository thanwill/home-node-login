import { Locality } from './locality.js';

class Movements {

    constructor(id, type, quantity, price_unitary, products, createdDate, modifiedDate) {
        this.id = id;
        this.type = {
            id: type.id,
            name: type.name,
            description: type.description
        }
        this.products = [{
            id: products.id,
            name: products.name,
            description: products.description,
            quantity: products.quantity,
            price: products.price
        }]
        this.quantity = quantity;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

}

class Inventory {

    constructor(id, name, description, quantity, localidade, createdDate, modifiedDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;

        this.localidade = [
            new Locality(
                localidade.id,
                localidade.street,
                localidade.number,
                localidade.complement,
                localidade.neighborhood,
                localidade.city,
                localidade.state,
                localidade.country,
                localidade.zip_code,
                localidade.createdDate,
                localidade.modifiedDate
            )            
        ]
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

}

class Products {

    constructor(id, name, description, quantity, price, createdDate, modifiedDate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.price = price;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

    static async createProduct() {
        try {
            const product = await Products.create({
                id: this.id,
                name: this.name,
                description: this.description,
                quantity: this.quantity,
                price: this.price,
                createdDate: this.createdDate,
                modifiedDate: this.modifiedDate
            });
            console.log('Produto criado com sucesso!');
            console.log(product);

            return product;
        } catch (err) {
            console.error(err);
            return err;

        }

    }
}

module.exports = {
    Inventory,
    Products,
    Movements
};
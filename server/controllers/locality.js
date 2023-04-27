class Locality {

    constructor(id, street, number, complement, neighborhood, city, state, country, zip_code, createdDate, modifiedDate) {
        this.id = id;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zip_code = zip_code;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }

}

module.exports = Locality;
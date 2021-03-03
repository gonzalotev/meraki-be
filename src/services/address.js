const {Address} = include('models');

class AddressService {
    static getData(id) {
        return Address.getData(id);
    }
}

module.exports = AddressService;

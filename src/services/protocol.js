const knex = include('helpers/database');

class ProtocolService {
    static fetch() {
        const protocols = knex.select('*').from('Protocolo');
        console.log('asd');
        return protocols;
    }
}

module.exports = ProtocolService;

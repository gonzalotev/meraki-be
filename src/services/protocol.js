const knex = include('helpers/database');

class ProtocolService {
    static fetch() {
        const protocols = knex.select('*').from('Protocolo');
        return protocols;
    }
}

module.exports = ProtocolService;

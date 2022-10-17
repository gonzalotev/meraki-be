const knex = include('helpers/database');

class ProtocolService {
    static async fetch() {
        const protocol = await knex.select('*')
            .from('Protocolo')
            .first();
        return {
            title: protocol.Titulo,
            content: protocol.Contenido,
            signature: protocol.Firma
        };
    }

    static update(protocol){
        return knex('Protocolo')
            .update({
                Titulo: protocol.title,
                Contenido: protocol.content,
                Firma: protocol.signature
            });
    }
}

module.exports = ProtocolService;

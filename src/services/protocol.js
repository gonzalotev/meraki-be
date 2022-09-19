const knex = include('helpers/database');

class ProtocolService {
    static fetch() {
        const protocols = knex.select('*').from('Protocolo');
        return protocols;
    }

    static findOne(filters){
        const protocol = knex.select('*')
            .from('Protocolo')
            .where({Serialkey: filters.serialKey});
        return protocol;
    }
    static deleteOne(serialKey){
        return knex.from('Protocolo')
            .where({Serialkey: serialKey})
            .del()
            .timeout(this.timeout);
    }

    static create(params){
        return knex.insert({
            Nombre: params.name,
            Detalle: params.details
        })
            .into('Protocolo')
            .timeout(this.timeout);
    }

    static update(params, serialKey){
        return knex('Protocolo')
            .update({
                Nombre: params.name,
                Detalle: params.details
            })
            .where(serialKey)
            .timeout(this.timeout);
    }
}

module.exports = ProtocolService;

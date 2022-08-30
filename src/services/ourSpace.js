const knex = include('helpers/database');

class ourSpaceService {
    static fetch() {
        const ourspace = knex.select('*').from('Espacio');
        return ourspace;
    }

    static findOne(filters){
        const ourspace = knex.select('*')
            .from('Espacio')
            .where({IdRegistro: filters.idregist});
        return ourspace;
    }
    static deleteOne(idregist){
        return knex.from('Espacio')
            .where({IdRegistro: idregist})
            .del()
            .timeout(this.timeout);
    }

    static create(params){
        const ourspace = knex.insert({
            Nombre: params.name,
            ImageUrl: params.image,
            Addwho: params.who,
            Editwho: params.datetime
        })
            .into('Espacio')
            .timeout(this.timeout);
        return ourspace;
    }

    static update(params, idregist){
        const ourspace = knex('Espacio')
            .update({
                Nombre: params.name,
                ImageUrl: params.image,
                Addwho: params.who,
                Editwho: params.datetime
            })
            .where(idregist)
            .timeout(this.timeout);
        return ourspace;
    }
}

module.exports = ourSpaceService;
const knex = include('helpers/database');

class ourSpaceService {
    static fetch() {
        return knex.select('*')
            .from('Espacio');
    }

    static findOne(filters){
        return knex.select('*')
            .from('Espacio')
            .where({IdRegistro: filters.idRegist});
    }
    static deleteOne(idRegist){
        return knex.from('Espacio')
            .where({IdRegistro: idRegist})
            .del();
    }

    static create(params){
        return knex.insert({
            Nombre: params.name,
            ImageUrl: params.image,
            Addwho: params.who,
            Editwho: new Date()
        })
            .into('Espacio');
    }

    static update(params, idregist){
        return knex('Espacio')
            .update({
                Nombre: params.name,
                ImageUrl: params.image,
                Addwho: params.who,
                Editwho: new Date()
            })
            .where(idregist);
    }
}

module.exports = ourSpaceService;

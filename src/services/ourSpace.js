const knex = include('helpers/database');

class ourSpaceService {
    static fetch() {
        const ourSpace = knex.select('*').from('Espacio');
        return ourSpace;
    }

    static findOne(filters){
        const ourSpace = knex.select('*')
            .from('Espacio')
            .where({IdRegistro: filters.idRegist});
        return ourSpace;
    }
    static deleteOne(idRegist){
        return knex.from('Espacio')
            .where({IdRegistro: idRegist})
            .del();
    }

    static create(params){
        const ourSpace = knex.insert({
            Nombre: params.name,
            ImageUrl: params.image,
            Addwho: params.who,
            Editwho: new Date()
        })
            .into('Espacio');
        return ourSpace;
    }

    static update(params, idregist){
        const ourSpace = knex('Espacio')
            .update({
                Nombre: params.name,
                ImageUrl: params.image,
                Addwho: params.who,
                Editwho: new Date()
            })
            .where(idregist);
        return ourSpace;
    }
}

module.exports = ourSpaceService;

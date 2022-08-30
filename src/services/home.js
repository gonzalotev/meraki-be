const knex = include('helpers/database');

class HomeService {
    static fetch() {
        const home = knex.select('*').from('Espacio');
        return home;
    }

    static findOne(filters){
        const home = knex.select('*')
            .from('Espacio')
            .where({IdRegistro: filters.idregist});
        return home;
    }
    static deleteOne(idregist){
        return knex.from('Espacio')
            .where({IdRegistro: idregist})
            .del()
            .timeout(this.timeout);
    }

    static create(params){
        const home = knex.insert({
            Nombre: params.name,
            ImageUrl: params.image,
            Addwho: params.who,
            Editwho: params.datetime
        })
            .into('Espacio')
            .timeout(this.timeout);
        return home;
    }

    static update(params, idregist){
        const home = knex('Espacio')
            .update({
                Nombre: params.name,
                ImageUrl: params.image,
                Addwho: params.who,
                Editwho: params.datetime
            })
            .where(idregist)
            .timeout(this.timeout);
        return home;
    }
}

module.exports = HomeService;
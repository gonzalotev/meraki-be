const knex = include('helpers/database');

class HomeService {
    static async fetch() {
        const homes = await knex.select('*').from('Home');
        return homes.map(home => ({
            idHome: home.IdHome,
            name: home.Nombre,
            image: home.ImageUrl,
            who: home.Addwho,
            date: home.Editwho
        }));
    }

    static findOne(filters){
        const home = knex.select('*')
            .from('Home')
            .where({IdRegistro: filters.IdHome});
        return home;
    }
    static deleteOne(IdHome){
        return knex.from('Home')
            .where({IdHome: IdHome})
            .del();
    }

    static create(params){
        const home = knex.insert({
            Nombre: params.name,
            ImageUrl: params.image,
            Addwho: params.who,
            Editwho: new Date()
        })
            .into('Home');
        return home;
    }

    static update(params, IdHome){
        const home = knex('Home')
            .update({
                Nombre: params.name,
                ImageUrl: params.image,
                Addwho: params.who,
                Editwho: new Date()
            })
            .where(IdHome);
        return home;
    }
}

module.exports = HomeService;

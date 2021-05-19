const knex = include('helpers/database');

class StaticDataService {
    static async getGenders(data){
        const genders = await knex.select({
            id: 'ID_GENERO_NUMERO',
            description: 'DESCRIPCION'
        }).from('GENERO_Y_NUMERO');
        return data.genders = genders;
    }
}

module.exports = StaticDataService;

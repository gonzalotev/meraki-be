const knex = include('helpers/database');

class StaticDataService {
    static async getGenders(data){
        const genders = await knex.select({
            id: 'ID_GENERO_NUMERO',
            description: 'DESCRIPCION'
        }).from('GENERO_Y_NUMERO');
        return data.genders = genders;
    }
    static async getOperatives(data){
        const operatives = await knex.select({
            id: 'ID_OPERATIVO',
            description: 'DESCRIPCION'
        })
            .from('OPERATIVOS')
            .whereExists(function() {
                this.select('*').from('NUEVAS_PALABRAS').whereRaw('operativos.id_operativo = nuevas_palabras.id_operativo');
            });
        return data.operatives = operatives;
    }
}

module.exports = StaticDataService;

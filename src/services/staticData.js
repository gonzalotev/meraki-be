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
    static async getVariablesNewsWords(data){
        const variablesNewsWords = await knex.select({
            id: 'ID_VARIABLE',
            name: 'NOMBRE'
        })
            .from('VARIABLES_ESTADISTICAS')
            .whereExists(function() {
                this.select('*').from('NUEVAS_PALABRAS').whereRaw('variables_estadisticas.id_variable = nuevas_palabras.id_variable');
            });
        return data.variablesNewsWords = variablesNewsWords;
    }
}

module.exports = StaticDataService;

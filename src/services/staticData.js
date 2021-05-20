const knex = include('helpers/database');

class StaticDataService {
    static async getGenders(data){
        const genders = await knex.select({
            id: 'ID_GENERO_NUMERO',
            description: 'DESCRIPCION'
        }).from('GENERO_Y_NUMERO');
        return data.genders = genders;
    }
    static async getNewWord(data){
        const newWoord = await knex.select({
            id_operative: 'ID_OPERATIVO',
            id_variable: 'ID_VARIABLE',
            news_words: 'NUEVAS_PALABRAS',
            frequence: 'FRECUENCIAS',
            abc: 'ABC',
            corrected: 'CORREGIDA'
        }).from('NUEVAS_PALABRAS');
        return data.newWoord = newWoord;
    }
}

module.exports = StaticDataService;

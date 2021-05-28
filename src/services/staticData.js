const knex = include('helpers/database');

class StaticDataService {
    static async getGenders(data) {
        const genders = await knex
            .select({
                id: 'ID_GENERO_NUMERO',
                description: 'DESCRIPCION'
            })
            .from('GENERO_Y_NUMERO');
        return (data.genders = genders);
    }
    static async getNewWord(data) {
        const newWoord = await knex
            .select({
                id_operative: 'ID_OPERATIVO',
                id_variable: 'ID_VARIABLE',
                news_words: 'NUEVAS_PALABRAS',
                frequence: 'FRECUENCIAS',
                abc: 'ABC',
                corrected: 'CORREGIDA'
            })
            .from('NUEVAS_PALABRAS');
        return (data.newWoord = newWoord);
    }
    static async getAutoPhrase(data) {
        const autoPhrase = await knex
            .select({
                id: 'ID_AUTOFRASE',
                id_variable: 'ID_VARIABLE',
                name: 'FRASE_FINAL'
            })
            .from('AUTOFRASES');
        return (data.autoPhrase = autoPhrase);
    }
    static async getNewPhrase(data) {
        const newPhrases = await knex
            .select({
                operative: 'ID_OPERATIVO',
                variable: 'ID_VARIABLE',
                name: 'NUEVAS_PALABRAS',
                phrase: 'NUEVAS_FRASES'
            })
            .from('NUEVAS_FRASES');
        return (data.newPhrases = newPhrases);
    }
}

module.exports = StaticDataService;

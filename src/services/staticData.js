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
    static async getNomenclators(data) {
        const nomenclators = await knex.select({
            id: 'ID_NOMENCLADOR',
            description: 'DESCRIPCION_COMPLETA',
            initials: 'SIGLA'
        })
            .from('NOMENCLADORES')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'DESCRIPCION_COMPLETA', order: 'asc'}]);
        data.nomenclators = nomenclators;
        return data;
    }
    static async getLots(data) {
        const lots = await knex
            .select({
                id: 'ID_LOTE',
                description: 'DESCRIPCION'
            })
            .from('LOTES');
        return (data.lots = lots);
    }
    static async getFont(data) {
        const fonts = await knex
            .select({
                id: 'ID_FUENTE',
                questionId: 'ID_PREGUNTA',
                openClosedId: 'ID_ABIERTA_CERRADA',
                codWord: 'CODIGO_PREGUNTA',
                variableId: 'ID_VARIABLE'
            })
            .from('RELACION_FUENTE_PREGUNTAS');
        return (data.fonts = fonts);
    }
    static async getNomenclatures(data) {
        const nomenclatures = await knex
            .select({
                id: 'ID_NOMENCLATURA',
                nomenclatorId: 'ID_NOMENCLADOR',
                description: 'DESCRIPCION',
                abbreviation: 'ABREVIATURA'
            })
            .from('NOMENCLATURAS');
        return (data.nomenclatures = nomenclatures);
    }
    static async getSources(data) {
        const sources = await knex.select({
            id: 'ID_FUENTE',
            name: 'NOMBRE',
            initials: 'SIGLA'
        })
            .from('FUENTES_OPERATIVO')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'NOMBRE', order: 'asc'}]);
        data.sources = sources;
        return data;
    }
    static async getQuestions(data) {
        const questions = await knex.select({
            id: 'ID_PREGUNTA',
            question: 'PREGUNTA'
        })
            .from('PREGUNTAS')
            .where({FECHA_BAJA: null})
            .orderBy([{column: 'PREGUNTA', order: 'asc'}]);
        data.questions = questions;
        return data;
    }
    static async getQuestionsTypes(data) {
        const questionsTypes = await knex.select({
            id: 'ID_ABIERTA_CERRADA',
            description: 'DESCRIPCION'
        })
            .from('TIPOS_DE_PREGUNTA')
            .orderBy([{column: 'ID_ABIERTA_CERRADA', order: 'asc'}]);
        data.questionsTypes = questionsTypes;
        return data;
    }
    static async getOperativeType(data){
        const operativeType = await knex.select({
            id: 'ID_TIPO_OPERATIVO',
            description: 'DESCRIPCION'
        })
            .from('TIPOS_DE_OPERATIVO')
            .orderBy([{column: 'ID_TIPO_OPERATIVO', order: 'asc'}]);
        data.operativeType = operativeType;
        return operativeType;
    }
    static async getFrequency(data){
        const frequency = await knex.select({
            id: 'ID_FRECUENCIA',
            description: 'DESCRIPCION'
        })
            .from('FRECUENCIAS')
            .orderBy([{column: 'ID_FRECUENCIA', order: 'asc'}]);
        data.frequency = frequency;
        return frequency;
    }
    static async getSupport(data){
        const support = await knex.select({
            id: 'ID_SOPORTE',
            description: 'DESCRIPCION'
        })
            .from('SOPORTE')
            .orderBy([{column: 'ID_SOPORTE', order: 'asc'}]);
        data.support = support;
        return support;
    }
}

module.exports = StaticDataService;

const { newPhrase: newPhraseModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class NewPhraseService {
    static async fetch(query) {
        const newsPhrases = await newPhraseModel.find({NUEVAS_PALABRAS: query.word});
        return newsPhrases.map(newPhrase => ({
            id_operative: newPhrase.ID_OPERATIVO,
            id_variable: newPhrase.ID_VARIABLE,
            news_words: newPhrase.NUEVAS_PALABRAS,
            id_phrase: newPhrase.ID_FRASE,
            news_phrases: newPhrase.NUEVAS_FRASES,
            frequence: newPhrase.FRECUENCIAS,
            abc: newPhrase.ABC,
            corrected: newPhrase.CORREGIDA,
            createdAt: dateToString(newPhrase.FECHA_ALTA)
        }));
    }

    static async create(params) {
        const formattedNewPhrase = {
            ID_OPERATIVO: trim(params.id_operative),
            ID_VARIABLE: trim(params.id_variable),
            NUEVAS_PALABRAS: trim(params.news_words),
            ID_FRASE: trim(params.id_phrase),
            NUEVAS_FRASES: trim(params.news_phrases),
            FRECUENCIAS: trim(params.frequence),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: new Date()
        };
        const newPhrase = await newPhraseModel.insertOne(formattedNewPhrase);

        return {
            id_operative: newPhrase.ID_OPERATIVO,
            id_variable: newPhrase.ID_VARIABLE,
            news_words: newPhrase.NUEVAS_PALABRAS,
            id_phrase: newPhrase.ID_FRASE,
            news_phrases: newPhrase.NUEVAS_FRASES,
            frequence: newPhrase.FRECUENCIAS,
            abc: newPhrase.ABC,
            corrected: newPhrase.CORREGIDA,
            createdAt: dateToString(newPhrase.FECHA_ALTA)
        };
    }

    static async findOne(filters){
        const newPhrase = await newPhraseModel.findById(
            {ID_OPERATIVO: filters.id_operative, ID_VARIABLE: filters.id_variable});
        return {
            id_operative: newPhrase.ID_OPERATIVO,
            id_variable: newPhrase.ID_VARIABLE,
            news_words: newPhrase.NUEVAS_PALABRAS,
            id_phrase: newPhrase.ID_FRASE,
            news_phrases: newPhrase.NUEVAS_FRASES,
            frequence: newPhrase.FRECUENCIAS,
            abc: newPhrase.ABC,
            corrected: newPhrase.CORREGIDA,
            createdAt: dateToString(newPhrase.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedNewPhrase = {
            ID_OPERATIVO: trim(params.id_operative),
            ID_VARIABLE: trim(params.id_variable),
            NUEVAS_PALABRAS: trim(params.news_words),
            ID_FRASE: trim(params.id_phrase),
            NUEVAS_FRASES: trim(params.news_phrases),
            FRECUENCIAS: trim(params.frequence),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: new Date()
        };
        const newPhrase = await newPhraseModel.updateOne(
            {ID_OPERATIVO: filters.id_operative, ID_VARIABLE: filters.id_variable},
            formattedNewPhrase);
        return {
            id_operative: newPhrase.ID_OPERATIVO,
            id_variable: newPhrase.ID_VARIABLE,
            news_words: newPhrase.NUEVAS_PALABRAS,
            id_phrase: newPhrase.ID_FRASE,
            news_phrases: newPhrase.NUEVAS_FRASES,
            frequence: newPhrase.FRECUENCIAS,
            abc: newPhrase.ABC,
            corrected: newPhrase.CORREGIDA,
            createdAt: dateToString(newPhrase.FECHA_ALTA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_OPERATIVO: filters.id_operative, ID_VARIABLE: filters.id_variable};
        const success = await newPhraseModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = NewPhraseService;

const { newWord: newWordModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class NewWordService {
    static async fetch() {
        const newsWords = await newWordModel.find();
        return newsWords.map(newWord => ({
            id_operative: newWord.ID_OPERATIVO,
            id_variable: newWord.ID_VARIABLE,
            news_words: newWord.NUEVAS_PALABRAS,
            frequence: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        }));
    }
    static async shortFetch(data) {
        const newsWords = await newWordModel.find(
            {},
            ['ID_VARIABLE', 'ID_OPERATIVO', 'NUEVAS_PALABRAS', 'CORREGIDA', 'FRECUENCIAS', 'ABC']
        );
        const words = newsWords.map(newWord => ({
            id_operative: newWord.ID_OPERATIVO,
            id_variable: newWord.ID_VARIABLE,
            news_words: newWord.NUEVAS_PALABRAS,
            frequence: newWord.FRECUENCIAS,
            corrected: newWord.CORREGIDA,
            abc: newWord.ABC
        }));
        return data.words = words;
    }
    static async find(filters){
        const newWord = await newWordModel.findById({
            ID_OPERATIVO: filters.id_operative,
            ID_VARIABLE: filters.id_variable
        });
        return {
            id_operative: newWord.ID_OPERATIVO,
            id_variable: newWord.ID_VARIABLE,
            news_words: newWord.NUEVAS_PALABRAS,
            frequence: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }
    static async create(params) {
        const formattedNewWord = {
            ID_OPERATIVO: trim(params.id_operative),
            ID_VARIABLE: trim(params.id_variable),
            NUEVAS_PALABRAS: trim(params.news_words),
            FRECUENCIAS: trim(params.frequence),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: new Date()
        };
        const newWord = await newWordModel.insertOne(formattedNewWord);

        return {
            id_operative: newWord.ID_OPERATIVO,
            id_variable: newWord.ID_VARIABLE,
            news_words: newWord.NUEVAS_PALABRAS,
            frequence: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedNewWord = {
            ID_OPERATIVO: trim(params.id_operative),
            ID_VARIABLE: trim(params.id_variable),
            NUEVAS_PALABRAS: trim(params.news_words),
            FRECUENCIAS: trim(params.frequence),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: new Date()
        };
        const newWord = await newWordModel.updateOne(
            {ID_OPERATIVO: filters.id_operative, ID_VARIABLE: filters.id_variable},
            formattedNewWord);
        return {
            id_operative: newWord.ID_OPERATIVO,
            id_variable: newWord.ID_VARIABLE,
            news_words: newWord.NUEVAS_PALABRAS,
            frequence: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_OPERATIVO: filters.id_operative, ID_VARIABLE: filters.id_variable};
        const success = await newWordModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = NewWordService;

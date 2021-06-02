const { newWord: newWordModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class NewWordService {
    static async fetch() {
        const newsWords = await newWordModel.find();
        return newsWords.map(newWord => ({
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        }));
    }
    static async fetchOperativeVariables(){
        const operatives = await newWordModel.getOperatives();
        const operativeVariables = await Promise.all(map(operatives, async operative => {
            const variables = await newWordModel.getVariables(operative.id);
            return {...operative, variables};
        }));
        return operativeVariables;
    }
    static async shortFetch(data) {
        const newsWords = await newWordModel.find(
            {},
            ['ID_VARIABLE', 'ID_OPERATIVO', 'NUEVAS_PALABRAS', 'CORREGIDA', 'FRECUENCIAS', 'ABC']
        );
        const words = newsWords.map(newWord => ({
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            corrected: newWord.CORREGIDA,
            abc: newWord.ABC
        }));
        return data.words = words;
    }
    static async find(filters){
        const newWord = await newWordModel.findById({
            ID_OPERATIVO: filters.operativeId,
            ID_VARIABLE: filters.variableId
        });
        return {
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }
    static async findFirst(filters){
        const newWord = await newWordModel.findOne({
            ID_OPERATIVO: filters.operative,
            ID_VARIABLE: filters.variable,
            CORREGIDA: null
        });

        return newWord ? {
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            cc: typeof newWord.DDD,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        } : {};
    }
    static async create(params) {
        const formattedNewWord = {
            ID_OPERATIVO: trim(params.operativeId),
            ID_VARIABLE: trim(params.variableId),
            NUEVAS_PALABRAS: trim(params.word),
            FRECUENCIAS: trim(params.frecuency),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: new Date()
        };
        const newWord = await newWordModel.insertOne(formattedNewWord);

        return {
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedNewWord = {
            ID_OPERATIVO: trim(params.operativeId),
            ID_VARIABLE: trim(params.variableId),
            NUEVAS_PALABRAS: trim(params.word),
            FRECUENCIAS: trim(params.frecuency),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: new Date()
        };
        const newWord = await newWordModel.updateOne(
            {ID_OPERATIVO: filters.operativeId, ID_VARIABLE: filters.variableId},
            formattedNewWord);
        return {
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: !!newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }
    static async updateOne(params){
        const formattedNewWord = {
            FRECUENCIAS: trim(params.frecuency),
            ABC: params.abc,
            CORREGIDA: params.corrected,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const newWord = await newWordModel.updateOne({
            ID_OPERATIVO: params.operativeId,
            ID_VARIABLE: params.variableId,
            NUEVAS_PALABRAS: params.word
        }, formattedNewWord);
        return {
            operativeId: newWord.ID_OPERATIVO,
            variableId: newWord.ID_VARIABLE,
            word: newWord.NUEVAS_PALABRAS,
            frecuency: newWord.FRECUENCIAS,
            abc: newWord.ABC,
            corrected: !!newWord.CORREGIDA,
            createdAt: dateToString(newWord.FECHA_ALTA)
        };
    }
    static async delete(filters, userDeleted){
        const formattedFilters = {ID_OPERATIVO: filters.operativeId, ID_VARIABLE: filters.variableId};
        const success = await newWordModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = NewWordService;

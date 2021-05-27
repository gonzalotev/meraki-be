const { dictionaryLinguistic } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class DictionaryLinguisticService {
    static async fetch(query) {
        const dictionaries = await dictionaryLinguistic.findByPage(
            query.page,
            {FECHA_BAJA: null},
            dictionaryLinguistic.selectableProps,
            [{column: 'DESCRIPCION_ORIGINAL', order: 'asc'}]
        );
        return dictionaries.map(dictionary => ({
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            dictionaryTypeId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: !!dictionary.SUPERVISADO,
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        }));
    }
    static async findOne(filters){
        const ids = {
            DESCRIPCION_ORIGINAL: filters.originalDescription,
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypeId,
            ID_VARIABLE: filters.variableId
        };
        const dictionary = await dictionaryLinguistic.findById(ids);
        return {
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            dictionaryTypeId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: !!dictionary.SUPERVISADO,
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }
    static async create(params, userCreator){
        const formattedDictionaryLinguistic = {
            DESCRIPCION_ORIGINAL: trim(params.originalDescription),
            ID_TIPOLOGIA_DE_DICCIONARIO: params.dictionaryTypeId,
            ID_VARIABLE: params.variableId,
            DESCRIPCION_DESTINO: trim(params.destinationDescription),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null
        };
        const dictionary = await dictionaryLinguistic.insertOne(formattedDictionaryLinguistic);
        return {
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            dictionaryTypeId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: !!dictionary.SUPERVISADO,
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }
    static async update(filters, params){
        const formattedDictionaryLinguistic = {
            DESCRIPCION_ORIGINAL: trim(params.originalDescription),
            ID_TIPOLOGIA_DE_DICCIONARIO: params.dictionaryTypeId,
            ID_VARIABLE: params.variableId,
            DESCRIPCION_DESTINO: trim(params.destinationDescription),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const ids = {
            DESCRIPCION_ORIGINAL: filters.originalDescription,
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypeId,
            ID_VARIABLE: filters.variableId
        };
        const dictionary = await dictionaryLinguistic.updateOne(ids, formattedDictionaryLinguistic);
        return {
            originalDescription: dictionary.DESCRIPCION_ORIGINAL,
            dictionaryTypeId: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            variableId: dictionary.ID_VARIABLE,
            destinationDescription: dictionary.DESCRIPCION_DESTINO,
            observation: dictionary.OBSERVACION,
            domain: dictionary.DOMINIO,
            approved: !!dictionary.SUPERVISADO,
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }
    static async delete(filters, userDeleted){
        const ids = {
            DESCRIPCION_ORIGINAL: filters.originalDescription,
            ID_TIPOLOGIA_DE_DICCIONARIO: filters.dictionaryTypeId,
            ID_VARIABLE: filters.variableId
        };
        const success = await dictionaryLinguistic.deleteOne(ids, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = DictionaryLinguisticService;

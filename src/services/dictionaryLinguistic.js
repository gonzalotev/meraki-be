const { dictionaryLinguistic } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const {arrayToCsvFormat} = include('util');
const map = require('lodash/map');

class DictionaryLinguisticService {
    static async fetch({page, search, formatted=false}) {
        const orderBy = [{column: 'DESCRIPCION_ORIGINAL', order: 'asc'}];
        const filterBy = {FECHA_BAJA: null};
        const columnsToSelect = dictionaryLinguistic.selectableProps;
        let dictionaries=[];
        if(page && search) {
            dictionaries = await dictionaryLinguistic.findByMatch(
                page,
                search,
                ['DESCRIPCION_ORIGINAL'],
                filterBy,
                orderBy
            );
        } else if(page){
            dictionaries = await dictionaryLinguistic.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            dictionaries = await dictionaryLinguistic.find(filterBy, columnsToSelect, orderBy);
        }

        if(formatted){
            return dictionaries;
        }
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

    static async getTotal({search}){
        const { total } = await dictionaryLinguistic.countTotal({FECHA_BAJA: null}, search, ['DESCRIPCION_ORIGINAL']);
        return total;
    }
    static getCsv({search}){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'DESCRIPCION_ORIGINAL',
                    nameInFile: 'DESCRIPCIÓN ORIGINAL'
                },
                {
                    nameInTable: 'DESCRIPCION_DESTINO',
                    nameInFile: 'DESCRIPCIÓN DESTINO'
                },
                {
                    nameInTable: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                    nameInFile: 'ID DE TIPOLOGÍA DICCIONARIO'
                },
                {
                    nameInTable: 'ID_VARIABLE',
                    nameInFile: 'ID DE VARIABLE'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                }
            ];
            const dictionaryLinguisticTableHeaders = map(fieldNames, field => field.nameInTable);
            const dictionaryLinguisticFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(dictionaryLinguisticFileHeaders);
            csvString += headers;
            const stream = dictionaryLinguistic.knex.select(dictionaryLinguisticTableHeaders)
                .from(dictionaryLinguistic.tableName)
                .where('DESCRIPCION_ORIGINAL', 'like', `${search}%`)
                .orderBy([{column: 'DESCRIPCION_ORIGINAL', order: 'asc'}])
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function() {
                resolve(csvString);
            });
        });
    }
}

module.exports = DictionaryLinguisticService;

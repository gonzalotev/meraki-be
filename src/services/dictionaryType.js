const { dictionaryType: dictionaryTypeModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');

class DictionaryTypeService {
    static async fetch() {
        const dictionarysTypes = await dictionaryTypeModel.find({FECHA_BAJA: null});
        return dictionarysTypes.map(dictionaryType => ({
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION,
            isOriginAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionaryType.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionaryType.EXPRESION_REGULAR,
            validation: dictionaryType.VALIDACION,
            observation: dictionaryType.OBSERVACION,
            domain: dictionaryType.DOMINIO,
            approved: !!dictionaryType.SUPERVISADO,
            createdAt: dateToString(dictionaryType.FECHA_ALTA),
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
        }));
    }
    static async shortFetch(data) {
        const dictionarysTypes = await dictionaryTypeModel.find(
            {SUPERVISADO: true, FECHA_BAJA: null},
            ['ID_TIPOLOGIA_DE_DICCIONARIO', 'DESCRIPCION'],
            [{column: 'DESCRIPCION', order: 'asc'}]
        );
        const dictionaries = dictionarysTypes.map(dictionaryType => ({
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION
        }));
        return data.dictionaries = dictionaries;
    }
    static async create(params, userCreator) {
        const formattedDictionaryType = {
            ID_TIPOLOGIA_DE_DICCIONARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            SI_PALABRA_NO_FRASE_ORIGEN: params.isOriginAWord,
            SI_DESCRIPCION_DESTINO: params.haveDesnityDescription,
            SI_PALABRA_NO_FRASE_DESTINO: params.isDestinyAWord,
            EXPRESION_REGULAR: params.haveRegex,
            VALIDACION: trim(params.validation),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const dictionaryType = await dictionaryTypeModel.insertOne(formattedDictionaryType);

        return {
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION,
            isOriginAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionaryType.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionaryType.EXPRESION_REGULAR,
            validation: dictionaryType.VALIDACION,
            observation: dictionaryType.OBSERVACION,
            domain: dictionaryType.DOMINIO,
            approved: !!dictionaryType.SUPERVISADO,
            createdAt: dateToString(dictionaryType.FECHA_ALTA),
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const dictionaryType = await dictionaryTypeModel.findById({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id});
        return {
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION,
            isOriginAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionaryType.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionaryType.EXPRESION_REGULAR,
            validation: dictionaryType.VALIDACION,
            observation: dictionaryType.OBSERVACION,
            domain: dictionaryType.DOMINIO,
            approved: !!dictionaryType.SUPERVISADO,
            createdAt: dateToString(dictionaryType.FECHA_ALTA),
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedDictionaryType = {
            ID_TIPOLOGIA_DE_DICCIONARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            SI_PALABRA_NO_FRASE_ORIGEN: params.isOriginAWord,
            SI_DESCRIPCION_DESTINO: params.haveDesnityDescription,
            SI_PALABRA_NO_FRASE_DESTINO: params.isDestinyAWord,
            EXPRESION_REGULAR: params.haveRegex,
            VALIDACION: trim(params.validation),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const dictionaryType = await dictionaryTypeModel.updateOne({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id},
            formattedDictionaryType);
        return {
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION,
            isOriginAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionaryType.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionaryType.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionaryType.EXPRESION_REGULAR,
            validation: dictionaryType.VALIDACION,
            observation: dictionaryType.OBSERVACION,
            domain: dictionaryType.DOMINIO,
            approved: !!dictionaryType.SUPERVISADO,
            createdAt: dateToString(dictionaryType.FECHA_ALTA),
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPOLOGIA_DE_DICCIONARIO: filters.id};
        const success = await dictionaryTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
    static async includeDictionariesTypes(resourceArray){
        const dictionariesTypesIds = uniq(map(resourceArray, resource => resource.dictionaryTypeId));
        const dictionariesTypes = await dictionaryTypeModel.getDictionariesTypes(dictionariesTypesIds);
        const resourceArrayWithDictionaryType = map(resourceArray, value => {
            const dictionaryType = find(dictionariesTypes, dictionary => dictionary.id === value.dictionaryTypeId);
            value.dictionaryType = dictionaryType;
            return value;
        });
        return resourceArrayWithDictionaryType;
    }

    static async getDictionaryTypeData(resources){
        const dictionariesTypesIds = uniq(map(resources, resource => resource.dictionaryTypeId));
        let dictionariesTypes = await dictionaryTypeModel.findByValues('ID_TIPOLOGIA_DE_DICCIONARIO', dictionariesTypesIds);
        dictionariesTypes = map(dictionariesTypes, dictionary => ({
            id: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionary.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.dictionaryType = find(
                dictionariesTypes,
                dictionary => dictionary.id === resource.dictionaryTypeId
            );
            return resource;
        });
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                    nameInFile: 'ID TIPO DE DICCIONARIO'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
                },
                {
                    nameInTable: 'SI_PALABRA_NO_FRASE_ORIGEN',
                    nameInFile: 'SI_PALABRA_NO_FRASE_ORIGEN'
                },
                {
                    nameInTable: 'SI_DESCRIPCION_DESTINO',
                    nameInFile: 'TIENE DESCRIPCIÓN DESTINO'
                },
                {
                    nameInTable: 'SI_PALABRA_NO_FRASE_DESTINO',
                    nameInFile: 'SI_PALABRA_NO_FRASE_DESTINO'
                },
                {
                    nameInTable: 'EXPRESION_REGULAR',
                    nameInFile: 'EXPRESIÓN REGULAR'
                },
                {
                    nameInTable: 'VALIDACION',
                    nameInFile: 'VALIDACIÓN'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
                }
            ];
            const dictionaryTypeTableHeaders = map(fieldNames, field => field.nameInTable);
            const dictionaryTypeFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(dictionaryTypeFileHeaders);
            csvString += headers;
            const stream = dictionaryTypeModel.knex.select(dictionaryTypeTableHeaders)
                .from(dictionaryTypeModel.tableName)
                .orderBy([{column: 'DESCRIPCION', order: 'asc'}])
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

module.exports = DictionaryTypeService;

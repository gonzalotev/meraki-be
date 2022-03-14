const { dictionaryType: dictionaryTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const knex = include('helpers/database');
const uniq = require('lodash/uniq');
const isDate = require('lodash/isDate');
const map = require('lodash/map');
const find = require('lodash/find');

class DictionaryTypeService {
    static async fetch(query) {
        if (query.sourceId && query.questionId) {
            const dictionarysTypes = await knex('TIPOS_DE_DICCIONARIO_LINGUISTICO')
                .whereNotExists(function() {
                    this.select('*')
                        .from('PASOS_PROCESOS_LINGUISTICOS')
                        .whereRaw('PASOS_PROCESOS_LINGUISTICOS.ID_TIPOLOGIA_DE_DICCIONARIO = TIPOS_DE_DICCIONARIO_LINGUISTICO.ID_TIPOLOGIA_DE_DICCIONARIO')
                        .andWhere('ID_FUENTE', query.sourceId)
                        .andWhere('ID_PREGUNTA', query.questionId);
                })
                .andWhere({ SUPERVISADO: true, FECHA_BAJA: null })
                .orderBy('DESCRIPCION');
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
                userCreator: dictionaryType.ID_USUARIO_ALTA
            }));
        }
        const dictionarysTypes = await dictionaryTypeModel.find();
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
            userCreator: dictionaryType.ID_USUARIO_ALTA
        }));
    }
    static async shortFetch(data) {
        const dictionarysTypes = await dictionaryTypeModel.find(
            { SUPERVISADO: true},
            ['ID_TIPOLOGIA_DE_DICCIONARIO', 'DESCRIPCION'],
            [{ column: 'DESCRIPCION', order: 'asc' }]
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
            FECHA_ALTA: new Date()
        };
        const dictionaryTypeId = await dictionaryTypeModel.insertOne(formattedDictionaryType, ['ID_TIPOLOGIA_DE_DICCIONARIO']);
        const dictionaryType = await DictionaryTypeService.findOne({ id: dictionaryTypeId });
        return dictionaryType;
    }

    static async findOne(filters) {
        const dictionaryType = await dictionaryTypeModel.findById({ ID_TIPOLOGIA_DE_DICCIONARIO: filters.id });
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
            userCreator: dictionaryType.ID_USUARIO_ALTA
        };
    }

    static async update(filters, params) {
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
            FECHA_ALTA: stringToDate(params.createdAt)
        };

        const dictionaryTypeId = await dictionaryTypeModel.updateOne({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id},
            formattedDictionaryType, ['ID_TIPOLOGIA_DE_DICCIONARIO']);
        const dictionaryType = await DictionaryTypeService.findOne({ id: dictionaryTypeId });
        return dictionaryType;
    }

    static delete(dictionaryTypeId) {
        return dictionaryTypeModel.deleteOne({ID_TIPOLOGIA_DE_DICCIONARIO: dictionaryTypeId});

    }
    static async includeDictionariesTypes(resourceArray) {
        const dictionariesTypesIds = uniq(map(resourceArray, resource => resource.dictionaryTypeId));
        const dictionariesTypes = await dictionaryTypeModel.getDictionariesTypes(dictionariesTypesIds);
        const resourceArrayWithDictionaryType = map(resourceArray, value => {
            const dictionaryType = find(dictionariesTypes, dictionary => dictionary.id === value.dictionaryTypeId);
            value.dictionaryType = dictionaryType;
            return value;
        });
        return resourceArrayWithDictionaryType;
    }

    static async getDictionaryTypeData(resources, field = 'dictionaryTypologyId') {
        const dictionaryTypesIds = uniq(map(resources, resource => resource[field]));
        let dictionaryTypes = await dictionaryTypeModel.knex.select()
            .from(dictionaryTypeModel.tableName)
            .whereIn('ID_TIPOLOGIA_DE_DICCIONARIO', dictionaryTypesIds);
        dictionaryTypes = map(dictionaryTypes, dictionaryType => ({
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.dictionaryType =
                find(dictionaryTypes, dictionaryType => dictionaryType.id === resource[field]);
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = dictionaryTypeModel.knex.select(columns)
                .from(dictionaryTypeModel.tableName)
                .where()
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                const formattedData = map(data, function(value) {
                    if(isDate(value)) {
                        return dateToString(value);
                    }
                    return value;
                });
                worksheet.addRow(formattedData);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'ID_TIPOLOGIA_DE_DICCIONARIO',
                modified: 'ID TIPO DE DICCIONARIO'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'SI_PALABRA_NO_FRASE_ORIGEN',
                modified: 'SI PALABRA / NO FRASE ORIGEN'
            },
            {
                original: 'SI_DESCRIPCION_DESTINO',
                modified: 'TIENE DESCRIPCIÓN DESTINO'
            },
            {
                original: 'SI_PALABRA_NO_FRASE_DESTINO',
                modified: 'SI PALABRA / NO FRASE DESTINO'
            },
            {
                original: 'EXPRESION_REGULAR',
                modified: 'EXPRESIÓN REGULAR'
            },
            {
                original: 'VALIDACION',
                modified: 'VALIDACION'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }

}

module.exports = DictionaryTypeService;

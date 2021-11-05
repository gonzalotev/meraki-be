const { dictionaryType: dictionaryTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');

class DictionaryTypeService {
    static async fetch() {
        const dictionarysTypes = await dictionaryTypeModel.find({ FECHA_BAJA: null });
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
            { SUPERVISADO: true, FECHA_BAJA: null },
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
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
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
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
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
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };

        const dictionaryTypeId = await dictionaryTypeModel.updateOne({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id},
            formattedDictionaryType, ['ID_TIPOLOGIA_DE_DICCIONARIO']);
        const dictionaryType = await DictionaryTypeService.findOne({ id: dictionaryTypeId });
        return dictionaryType;
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_TIPOLOGIA_DE_DICCIONARIO: filters.id };
        const success = await dictionaryTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
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
                .where({ FECHA_BAJA: null })
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                worksheet.addRow(data);
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

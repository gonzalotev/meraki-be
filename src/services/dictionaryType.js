const { dictionaryType } = include('models');
const { dictionaryTypesKeyNames } = include('constants/keyNames');
const { dateToString, stringToDate, convertKeysNames } = include('util');
const invert = require('lodash/invert');

class DictionaryTypeService {
    static async fetch() {
        const dictionaries = await dictionaryType.find();
        return dictionaries.map(dictionary => convertKeysNames({
            ...dictionary,
            SUPERVISADO: !!dictionary.SUPERVISADO,
            SI_PALABRA_NO_FRASE_ORIGEN: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            SI_DESCRIPCION_DESTINO: !!dictionary.SI_DESCRIPCION_DESTINO,
            SI_PALABRA_NO_FRASE_DESTINO: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            EXPRESION_REGULAR: !!dictionary.EXPRESION_REGULAR,
            FECHA_ALTA: dateToString(dictionary.FECHA_ALTA),
            FECHA_BAJA: dateToString(dictionary.FECHA_BAJA)
        }, invert(dictionaryTypesKeyNames)));
    }

    static async create(params, userCreator) {
        const formattedDictionary = convertKeysNames({
            ...params,
            userCreator,
            createdAt: new Date()
        }, dictionaryTypesKeyNames);
        const dictionary = await dictionaryType.insertOne(formattedDictionary);
        return convertKeysNames({
            ...dictionary,
            SUPERVISADO: !!dictionary.SUPERVISADO,
            SI_PALABRA_NO_FRASE_ORIGEN: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            SI_DESCRIPCION_DESTINO: !!dictionary.SI_DESCRIPCION_DESTINO,
            SI_PALABRA_NO_FRASE_DESTINO: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            EXPRESION_REGULAR: !!dictionary.EXPRESION_REGULAR,
            FECHA_ALTA: dateToString(dictionary.FECHA_ALTA),
            FECHA_BAJA: dateToString(dictionary.FECHA_BAJA)
        }, invert(dictionaryTypesKeyNames));
    }

    static async findOne(filters){
        const dictionary = await dictionaryType.findById({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id});
        return convertKeysNames({
            ...dictionary,
            SUPERVISADO: !!dictionary.SUPERVISADO,
            SI_PALABRA_NO_FRASE_ORIGEN: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            SI_DESCRIPCION_DESTINO: !!dictionary.SI_DESCRIPCION_DESTINO,
            SI_PALABRA_NO_FRASE_DESTINO: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            EXPRESION_REGULAR: !!dictionary.EXPRESION_REGULAR,
            FECHA_ALTA: dateToString(dictionary.FECHA_ALTA),
            FECHA_BAJA: dateToString(dictionary.FECHA_BAJA)
        }, invert(dictionaryTypesKeyNames));
    }

    static async update(filters, params){
        const formattedDictionary = convertKeysNames({
            ...params,
            deletedAt: stringToDate(params.deletedAt),
            createdAt: stringToDate(params.createdAt)
        }, dictionaryTypesKeyNames);
        const formattedFilters = {ID_TIPOLOGIA_DE_DICCIONARIO: filters.id};
        const dictionary = await dictionaryType.updateOne(formattedFilters, formattedDictionary);
        return convertKeysNames({
            ...dictionary,
            SUPERVISADO: !!dictionary.SUPERVISADO,
            SI_PALABRA_NO_FRASE_ORIGEN: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            SI_DESCRIPCION_DESTINO: !!dictionary.SI_DESCRIPCION_DESTINO,
            SI_PALABRA_NO_FRASE_DESTINO: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            EXPRESION_REGULAR: !!dictionary.EXPRESION_REGULAR,
            FECHA_ALTA: dateToString(dictionary.FECHA_ALTA),
            FECHA_BAJA: dateToString(dictionary.FECHA_BAJA)
        }, invert(dictionaryTypesKeyNames));
    }

    static async delete(filters, userDeleted){
        const success = await dictionaryType.deleteOne({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = DictionaryTypeService;

const { dictionaryType } = include('models');
const { dateToString } = include('util');

class DictionaryTypeService {
    static async fetch() {
        const dictionaries = await dictionaryType.find();
        return dictionaries.map(dictionary => ({
            id: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionary.DESCRIPCION,
            isOriginAWord: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionary.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionary.EXPRESION_REGULAR,
            validation: dictionary.VALIDACION,
            approved: !!dictionary.SUPERVISADO,
            domain: dictionary.DOMINIO,
            observation: dictionary.OBSERVACION,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedDictionary = {
            ID_TIPOLOGIA_DE_DICCIONARIO: params.id,
            DESCRIPCION: params.description,
            SI_PALABRA_NO_FRASE_ORIGEN: params.isOriginAWord,
            SI_DESCRIPCION_DESTINO: params.haveDesnityDescription,
            SI_PALABRA_NO_FRASE_DESTINO: params.isDestinyAWord,
            EXPRESION_REGULAR: params.haveRegex,
            VALIDACION: params.validation,
            SUPERVISADO: params.approved,
            DOMINIO: params.domain,
            OBSERVACION: params.observation,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const dictionary = await dictionaryType.insertOne(formattedDictionary);

        return {
            id: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionary.DESCRIPCION,
            isOriginAWord: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionary.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionary.EXPRESION_REGULAR,
            validation: dictionary.VALIDACION,
            approved: !!dictionary.SUPERVISADO,
            domain: dictionary.DOMINIO,
            observation: dictionary.OBSERVACION,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const dictionary = await dictionaryType.findById({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id});
        return {
            id: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionary.DESCRIPCION,
            isOriginAWord: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionary.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionary.EXPRESION_REGULAR,
            validation: dictionary.VALIDACION,
            approved: !!dictionary.SUPERVISADO,
            domain: dictionary.DOMINIO,
            observation: dictionary.OBSERVACION,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedDictionary = {
            ID_TIPOLOGIA_DE_DICCIONARIO: params.id,
            DESCRIPCION: params.description,
            SI_PALABRA_NO_FRASE_ORIGEN: params.isOriginAWord,
            SI_DESCRIPCION_DESTINO: params.haveDesnityDescription,
            SI_PALABRA_NO_FRASE_DESTINO: params.isDestinyAWord,
            EXPRESION_REGULAR: params.haveRegex,
            VALIDACION: params.validation,
            SUPERVISADO: params.approved,
            DOMINIO: params.domain,
            OBSERVACION: params.observation,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: params.createdAt
        };
        const formattedFilters = {ID_TIPOLOGIA_DE_DICCIONARIO: filters.id};
        const dictionary = await dictionaryType.updateOne(formattedFilters, formattedDictionary);
        return {
            id: dictionary.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionary.DESCRIPCION,
            isOriginAWord: !!dictionary.SI_PALABRA_NO_FRASE_ORIGEN,
            haveDesnityDescription: !!dictionary.SI_DESCRIPCION_DESTINO,
            isDestinyAWord: !!dictionary.SI_PALABRA_NO_FRASE_DESTINO,
            haveRegex: !!dictionary.EXPRESION_REGULAR,
            validation: dictionary.VALIDACION,
            approved: !!dictionary.SUPERVISADO,
            domain: dictionary.DOMINIO,
            observation: dictionary.OBSERVACION,
            createdAt: dateToString(dictionary.FECHA_ALTA),
            userCreator: dictionary.ID_USUARIO_ALTA,
            userDeleted: dictionary.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionary.FECHA_BAJA)
        };
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

const { linguisticDictionaryType: linguisticDictionaryTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');

class LinguisticDictionaryTypeService {
    static async fetch() {
        const linguisticDictionarysTypes = await linguisticDictionaryTypeModel.find({FECHA_BAJA: null});
        return linguisticDictionarysTypes.map(linguisticDictionaryType => ({
            id: linguisticDictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: linguisticDictionaryType.DESCRIPCION,
            observation: linguisticDictionaryType.OBSERVACION,
            domain: linguisticDictionaryType.DOMINIO,
            approved: linguisticDictionaryType.SUPERVISADO,
            createdAt: dateToString(linguisticDictionaryType.FECHA_ALTA),
            userCreator: linguisticDictionaryType.ID_USUARIO_ALTA,
            userDeleted: linguisticDictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(linguisticDictionaryType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedLinguisticDictionaryType = {
            ID_TIPOLOGIA_DE_DICCIONARIO: null,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const linguisticDictionaryType =
        await linguisticDictionaryTypeModel.insertOne(formattedLinguisticDictionaryType);

        return {
            id: linguisticDictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: linguisticDictionaryType.DESCRIPCION,
            observation: linguisticDictionaryType.OBSERVACION,
            domain: linguisticDictionaryType.DOMINIO,
            approved: !!linguisticDictionaryType.SUPERVISADO,
            createdAt: dateToString(linguisticDictionaryType.FECHA_ALTA),
            userCreator: linguisticDictionaryType.ID_USUARIO_ALTA,
            userDeleted: linguisticDictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(linguisticDictionaryType.FECHA_BAJA)
        };
    }
    static async findOne(filters){
        const linguisticDictionaryType = await
        linguisticDictionaryTypeModel.findById({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id});
        return {
            id: linguisticDictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: linguisticDictionaryType.DESCRIPCION,
            observation: linguisticDictionaryType.OBSERVACION,
            domain: linguisticDictionaryType.DOMINIO,
            approved: linguisticDictionaryType.SUPERVISADO,
            createdAt: dateToString(linguisticDictionaryType.FECHA_ALTA),
            userCreator: linguisticDictionaryType.ID_USUARIO_ALTA,
            userDeleted: linguisticDictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(linguisticDictionaryType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedLinguisticDictionaryType = {
            ID_TIPOLOGIA_DE_DICCIONARIO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const linguisticDictionaryType = await
        linguisticDictionaryTypeModel.updateOne({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id},
            formattedLinguisticDictionaryType);
        return {
            id: linguisticDictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: linguisticDictionaryType.DESCRIPCION,
            observation: linguisticDictionaryType.OBSERVACION,
            domain: linguisticDictionaryType.DOMINIO,
            approved: !!linguisticDictionaryType.SUPERVISADO,
            createdAt: dateToString(linguisticDictionaryType.FECHA_ALTA),
            userCreator: linguisticDictionaryType.ID_USUARIO_ALTA,
            userDeleted: linguisticDictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(linguisticDictionaryType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPOLOGIA_DE_DICCIONARIO: filters.id};
        const success = await linguisticDictionaryTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = LinguisticDictionaryTypeService;

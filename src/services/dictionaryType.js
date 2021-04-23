const { dictionaryType: dictionaryTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');

class DictionaryTypeService {
    static async fetch() {
        const dictionarysTypes = await dictionaryTypeModel.find({FECHA_BAJA: null});
        return dictionarysTypes.map(dictionaryType => ({
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION,
            observation: dictionaryType.OBSERVACION,
            domain: dictionaryType.DOMINIO,
            approved: dictionaryType.SUPERVISADO,
            createdAt: dateToString(dictionaryType.FECHA_ALTA),
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedDictionaryType = {
            ID_TIPOLOGIA_DE_DICCIONARIO: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
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
            observation: dictionaryType.OBSERVACION,
            domain: dictionaryType.DOMINIO,
            approved: dictionaryType.SUPERVISADO,
            createdAt: dateToString(dictionaryType.FECHA_ALTA),
            userCreator: dictionaryType.ID_USUARIO_ALTA,
            userDeleted: dictionaryType.ID_USUARIO_BAJA,
            deletedAt: dateToString(dictionaryType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedDictionaryType = {
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
        const dictionaryType = await dictionaryTypeModel.updateOne({ID_TIPOLOGIA_DE_DICCIONARIO: filters.id},
            formattedDictionaryType);
        return {
            id: dictionaryType.ID_TIPOLOGIA_DE_DICCIONARIO,
            description: dictionaryType.DESCRIPCION,
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
}

module.exports = DictionaryTypeService;

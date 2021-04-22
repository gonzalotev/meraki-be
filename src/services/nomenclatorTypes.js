const { nomenclatorTypes } = include('models');
const { nomenclatorTypesAttrib } = include('constants');
const { dateToString, stringToDate } = include('util');

class NomenclatorTypesService {
    static async fetchStaticNomenclatorTypes() {
        const nomenclatorTypeGet = await nomenclatorTypes.findAll(nomenclatorTypesAttrib);
        return nomenclatorTypeGet.map(nomenclatorType => ({
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA),
            userCreator: nomenclatorType.ID_USUARIO_ALTA,
            userDeleted: nomenclatorType.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclatorType.FECHA_BAJA)
        }));
    }

    static async findOne(filters){
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorType = await nomenclatorTypes.findById(formattedFilters);
        return {
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA),
            userCreator: nomenclatorType.ID_USUARIO_ALTA,
            userDeleted: nomenclatorType.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclatorType.FECHA_BAJA)
        };
    }

    static async create(params, userCreator){
        const formattedNomenclatorType = {
            ID_TIPO: params.id,
            DESCRIPCION: params.description,
            SUPERVISADO: params.supervised,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const nomenclatorType = await nomenclatorTypes.insertOne(formattedNomenclatorType);
        return {
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: !!nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            userId: nomenclatorType.ID_USUARIO_ALTA,
            deletedAt: dateToString(nomenclatorType.FECHA_BAJA),
            deletedBy: nomenclatorType.ID_USUARIO_BAJA,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA)
        };

    }

    static async update(filters, params){
        const formattedNomenclatorType = {
            ID_TIPO: params.id,
            DESCRIPCION: params.description,
            SUPERVISADO: params.supervised,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorType = await nomenclatorTypes.updateOne(formattedFilters, formattedNomenclatorType);
        return {
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: !!nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            userId: nomenclatorType.ID_USUARIO_ALTA,
            deletedAt: dateToString(nomenclatorType.FECHA_BAJA),
            deletedBy: nomenclatorType.ID_USUARIO_BAJA,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA)
        };
    }

    static async deleteOne(filters, userDeleted){
        const{
            id: ID_TIPO
        } = filters;
        const id = {ID_TIPO};
        const success = await nomenclatorTypes.deleteOne(id, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return success;
    }
}

module.exports = NomenclatorTypesService;

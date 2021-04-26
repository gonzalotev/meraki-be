const { nomenclatorSubtypes } = include('models');
const { dateToString } = include('util');

class NomenclatorSubtypeService {
    static async fetch() {
        const nomenclators = await nomenclatorSubtypes.find({FECHA_BAJA: null});
        return nomenclators.map(nomenclator => ({
            id: nomenclator.ID_SUBTIPO,
            typeId: nomenclator.ID_TIPO,
            description: nomenclator.DESCRIPCION,
            approved: !!nomenclator.SUPERVISADO,
            domain: nomenclator.DOMINIO,
            observation: nomenclator.OBSERVACION,
            createdAt: dateToString(nomenclator.FECHA_ALTA),
            userCreator: nomenclator.ID_USUARIO_ALTA,
            userDeleted: nomenclator.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclator.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedNomenclator = {
            ID_SUBTIPO: params.id,
            ID_TIPO: params.typeId,
            DESCRIPCION: params.description,
            SUPERVISADO: params.approved,
            DOMINIO: params.domain,
            OBSERVACION: params.observation,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const nomenclator = await nomenclatorSubtypes.insertOne(formattedNomenclator);

        return {
            id: nomenclator.ID_SUBTIPO,
            typeId: nomenclator.ID_TIPO,
            description: nomenclator.DESCRIPCION,
            approved: !!nomenclator.SUPERVISADO,
            domain: nomenclator.DOMINIO,
            observation: nomenclator.OBSERVACION,
            createdAt: dateToString(nomenclator.FECHA_ALTA),
            userCreator: nomenclator.ID_USUARIO_ALTA,
            userDeleted: nomenclator.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclator.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const nomenclator = await nomenclatorSubtypes.findById({ID_SUBTIPO: filters.id, ID_TIPO: filters.typeId});
        return {
            id: nomenclator.ID_SUBTIPO,
            typeId: nomenclator.ID_TIPO,
            description: nomenclator.DESCRIPCION,
            approved: !!nomenclator.SUPERVISADO,
            domain: nomenclator.DOMINIO,
            observation: nomenclator.OBSERVACION,
            createdAt: dateToString(nomenclator.FECHA_ALTA),
            userCreator: nomenclator.ID_USUARIO_ALTA,
            userDeleted: nomenclator.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclator.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedNomenclator = {
            DESCRIPCION: params.description,
            SUPERVISADO: params.approved,
            DOMINIO: params.domain,
            OBSERVACION: params.observation
        };
        const formattedFilters = {ID_SUBTIPO: filters.id, ID_TIPO: filters.typeId};
        const nomenclator = await nomenclatorSubtypes.updateOne(formattedFilters, formattedNomenclator);
        return {
            id: nomenclator.ID_SUBTIPO,
            typeId: nomenclator.ID_TIPO,
            description: nomenclator.DESCRIPCION,
            approved: !!nomenclator.SUPERVISADO,
            domain: nomenclator.DOMINIO,
            observation: nomenclator.OBSERVACION,
            createdAt: dateToString(nomenclator.FECHA_ALTA),
            userCreator: nomenclator.ID_USUARIO_ALTA,
            userDeleted: nomenclator.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclator.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await nomenclatorSubtypes.deleteOne({ID_SUBTIPO: filters.id, ID_TIPO: filters.typeId}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = NomenclatorSubtypeService;

const { nomenclatorTypes } = include('models');
const { nomenclatorTypesAttrib } = include('constants');
const { dateTimeToString } = include('util');

class NomenclatorTypesService {
    static async fetchStaticNomenclatorTypes() {
        const nomenclatorTypeGet = await nomenclatorTypes.findAll(nomenclatorTypesAttrib);
        return nomenclatorTypeGet.map(nomenclatorType => ({
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO
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
            domain: nomenclatorType.DOMINIO
        };
    }

    static async create(params, userCreator){
        const formattedNomenclatorType = {
            ID_TIPO: params.typeId,
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
            deletedAt: dateTimeToString(nomenclatorType.FECHA_BAJA),
            deletedBy: nomenclatorType.ID_USUARIO_BAJA,
            createdAt: dateTimeToString(nomenclatorType.FECHA_ALTA)
        };

    }

    static async update(filters, params){
        const formattedNomenclatorType = {
            ID_TIPO: params.typeId,
            DESCRIPCION: params.description,
            SUPERVISADO: params.supervised,
            OBSERVACION: params.observation,
            DOMINIO: params.domain
        };
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorType = await nomenclatorTypes.updateOne(formattedFilters, formattedNomenclatorType);
        return {
            typeId: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: !!nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            userId: nomenclatorType.ID_USUARIO_ALTA,
            deletedAt: dateTimeToString(nomenclatorType.FECHA_BAJA),
            deletedBy: nomenclatorType.ID_USUARIO_BAJA,
            createdAt: dateTimeToString(nomenclatorType.FECHA_ALTA)
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

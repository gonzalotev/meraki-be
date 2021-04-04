const { relationType } = include('models');
const { dateToString } = include('util');

class RelationTypeService {
    static async fetch() {
        const relations = await relationType.find();
        return relations.map(relation => ({
            id: relation.ID_TIPO_RELACION,
            description: relation.DESCRIPCION,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            createdAt: dateToString(relation.FECHA_ALTA),
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            deletedAt: dateToString(relation.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedRelation = {
            ID_TIPO_RELACION: null,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const relation = await relationType.insertOne(formattedRelation);

        return {
            id: relation.ID_TIPO_RELACION,
            description: relation.DESCRIPCION,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            createdAt: dateToString(relation.FECHA_ALTA),
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            deletedAt: dateToString(relation.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const relation = await relationType.findById({ID_TIPO_RELACION: filters.id});
        return {
            id: relation.ID_TIPO_RELACION,
            description: relation.DESCRIPCION,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            createdAt: dateToString(relation.FECHA_ALTA),
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            deletedAt: dateToString(relation.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedRelation = {
            ID_TIPO_RELACION: params.id,
            DESCRIPCION: params.description,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: new Date()
        };
        const relation = await relationType.updateOne({ID_TIPO_RELACION: filters.id}, formattedRelation);
        return {
            id: relation.ID_TIPO_RELACION,
            description: relation.DESCRIPCION,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            approved: !!relation.SUPERVISADO,
            createdAt: dateToString(relation.FECHA_ALTA),
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            deletedAt: dateToString(relation.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const success = await relationType.deleteOne({ID_TIPO_RELACION: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RelationTypeService;

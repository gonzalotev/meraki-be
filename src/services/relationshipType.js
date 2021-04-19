const { relationshipType } = include('models');
const { relationTypesKeyNames } = include('constants/keyNames');
const { dateToString, stringToDate, convertKeysNames } = include('util');
const invert = require('lodash/invert');

class RelationshipTypeService {
    static async fetch() {
        const relations = await relationshipType.find({FECHA_BAJA: null});

        return relations.map(relation => convertKeysNames({
            ...relation,
            SUPERVISADO: !!relation.SUPERVISADO,
            FECHA_ALTA: dateToString(relation.FECHA_ALTA),
            FECHA_BAJA: dateToString(relation.FECHA_BAJA)
        }, invert(relationTypesKeyNames)));
    }

    static async create(params, userCreator) {
        const formattedRelation = convertKeysNames({
            ...params,
            userCreator,
            createdAt: new Date()
        }, relationTypesKeyNames);

        const relation = await relationshipType.insertOne(formattedRelation);

        return convertKeysNames({
            ...relation,
            SUPERVISADO: !!relation.SUPERVISADO,
            FECHA_ALTA: dateToString(relation.FECHA_ALTA),
            FECHA_BAJA: dateToString(relation.FECHA_BAJA)
        }, invert(relationTypesKeyNames));
    }

    static async findOne(filters){
        const relation = await relationshipType.findById({ID_TIPO_RELACION: filters.id});
        return convertKeysNames({
            ...relation,
            SUPERVISADO: !!relation.SUPERVISADO,
            FECHA_ALTA: dateToString(relation.FECHA_ALTA),
            FECHA_BAJA: dateToString(relation.FECHA_BAJA)
        }, invert(relationTypesKeyNames));
    }

    static async update(filters, params){
        const formattedRelation = convertKeysNames({
            ...params,
            deletedAt: stringToDate(params.deletedAt),
            createdAt: stringToDate(params.createdAt)
        }, relationTypesKeyNames);
        const relation = await relationshipType.updateOne({ID_TIPO_RELACION: filters.id}, formattedRelation);
        return convertKeysNames({
            ...relation,
            SUPERVISADO: !!relation.SUPERVISADO,
            FECHA_ALTA: dateToString(relation.FECHA_ALTA),
            FECHA_BAJA: dateToString(relation.FECHA_BAJA)
        }, invert(relationTypesKeyNames));
    }

    static async delete(filters, userDeleted){
        const success = await relationshipType.deleteOne({ID_TIPO_RELACION: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RelationshipTypeService;

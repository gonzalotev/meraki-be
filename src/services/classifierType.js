const { classifierType: classifierTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class ClassifierTypeService {
    static async fetch() {
        const classifiersTypes = await classifierTypeModel.find({FECHA_BAJA: null});
        return classifiersTypes.map(classifierType => ({
            id: classifierType.ID_TIPO_CLASIFICADOR,
            abbreviation: classifierType.ABREVIATURA,
            description: classifierType.DESCRIPCION,
            observation: classifierType.OBSERVACION,
            domain: classifierType.DOMINIO,
            approved: classifierType.SUPERVISADO,
            createdAt: dateToString(classifierType.FECHA_ALTA),
            userCreator: classifierType.ID_USUARIO_ALTA,
            userDeleted: classifierType.ID_USUARIO_BAJA,
            deletedAt: dateToString(classifierType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedClassifierType = {
            ID_TIPO_CLASIFICADOR: trim(params.id),
            ABREVIATURA: trim(params.abbreviation),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const classifierType = await classifierTypeModel.insertOne(formattedClassifierType);

        return {
            id: classifierType.ID_TIPO_CLASIFICADOR,
            abbreviation: classifierType.ABREVIATURA,
            description: classifierType.DESCRIPCION,
            observation: classifierType.OBSERVACION,
            domain: classifierType.DOMINIO,
            approved: !!classifierType.SUPERVISADO,
            createdAt: dateToString(classifierType.FECHA_ALTA),
            userCreator: classifierType.ID_USUARIO_ALTA,
            userDeleted: classifierType.ID_USUARIO_BAJA,
            deletedAt: dateToString(classifierType.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const classifierType = await classifierTypeModel.findById({ID_TIPO_CLASIFICADOR: filters.id});
        return {
            id: classifierType.ID_TIPO_CLASIFICADOR,
            abbreviation: classifierType.ABREVIATURA,
            description: classifierType.DESCRIPCION,
            observation: classifierType.OBSERVACION,
            domain: classifierType.DOMINIO,
            approved: !!classifierType.SUPERVISADO,
            createdAt: dateToString(classifierType.FECHA_ALTA),
            userCreator: classifierType.ID_USUARIO_ALTA,
            userDeleted: classifierType.ID_USUARIO_BAJA,
            deletedAt: dateToString(classifierType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedClassifierType = {
            ID_TIPO_CLASIFICADOR: params.id,
            ABREVIATURA: trim(params.abbreviation),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const classifierType = await classifierTypeModel.updateOne({ID_TIPO_CLASIFICADOR: filters.id},
            formattedClassifierType);
        return {
            id: classifierType.ID_TIPO_CLASIFICADOR,
            abbreviation: classifierType.ABREVIATURA,
            description: classifierType.DESCRIPCION,
            observation: classifierType.OBSERVACION,
            domain: classifierType.DOMINIO,
            approved: !!classifierType.SUPERVISADO,
            createdAt: dateToString(classifierType.FECHA_ALTA),
            userCreator: classifierType.ID_USUARIO_ALTA,
            userDeleted: classifierType.ID_USUARIO_BAJA,
            deletedAt: dateToString(classifierType.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_CLASIFICADOR: filters.id};
        const success = await classifierTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = ClassifierTypeService;

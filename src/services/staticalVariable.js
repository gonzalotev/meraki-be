const { staticalVariable: staticalVariableModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class StaticalVariableService {
    static async fetch() {
        const staticalsVariables = await staticalVariableModel.find({FECHA_BAJA: null});
        return staticalsVariables.map(staticalVariable => ({
            id: staticalVariable.ID_VARIABLE,
            name: staticalVariable.NOMBRE,
            abbreviation: staticalVariable.ABREVIATURA,
            digits: staticalVariable.DIGITOS,
            observation: staticalVariable.OBSERVACION,
            domain: staticalVariable.DOMINIO,
            approved: staticalVariable.SUPERVISADO,
            id_father: staticalVariable.ID_PADRE,
            createdAt: dateToString(staticalVariable.FECHA_ALTA),
            userCreator: staticalVariable.ID_USUARIO_ALTA,
            userDeleted: staticalVariable.ID_USUARIO_BAJA,
            deletedAt: dateToString(staticalVariable.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedStaticalVariable = {
            ID_VARIABLE: trim(params.id),
            NOMBRE: trim(params.name),
            ABREVIATURA: trim(params.abbreviation),
            DIGITOS: params.digits,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_PADRE: trim(params.id_father),
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const staticalVariable = await staticalVariableModel.insertOne(formattedStaticalVariable);

        return {
            id: staticalVariable.ID_VARIABLE,
            name: staticalVariable.NOMBRE,
            abbreviation: staticalVariable.ABREVIATURA,
            digits: staticalVariable.DIGITOS,
            observation: staticalVariable.OBSERVACION,
            domain: staticalVariable.DOMINIO,
            approved: !!staticalVariable.SUPERVISADO,
            id_father: staticalVariable.ID_PADRE,
            createdAt: dateToString(staticalVariable.FECHA_ALTA),
            userCreator: staticalVariable.ID_USUARIO_ALTA,
            userDeleted: staticalVariable.ID_USUARIO_BAJA,
            deletedAt: dateToString(staticalVariable.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const staticalVariable = await staticalVariableModel.findById({ID_VARIABLE: filters.id});
        return {
            id: staticalVariable.ID_VARIABLE,
            name: staticalVariable.NOMBRE,
            abbreviation: staticalVariable.ABREVIATURA,
            digits: staticalVariable.DIGITOS,
            observation: staticalVariable.OBSERVACION,
            domain: staticalVariable.DOMINIO,
            approved: staticalVariable.SUPERVISADO,
            id_father: staticalVariable.ID_PADRE,
            createdAt: dateToString(staticalVariable.FECHA_ALTA),
            userCreator: staticalVariable.ID_USUARIO_ALTA,
            userDeleted: staticalVariable.ID_USUARIO_BAJA,
            deletedAt: dateToString(staticalVariable.FECHA_BAJA)
        };
    }

    static async update(filters, params, userCreator){
        const formattedStaticalVariable = {
            ID_VARIABLE: trim(params.id),
            NOMBRE: trim(params.name),
            ABREVIATURA: trim(params.abbreviation),
            DIGITOS: params.digits,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_PADRE: trim(params.id_father),
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const staticalVariable = await staticalVariableModel.updateOne(
            {ID_VARIABLE: filters.id}, formattedStaticalVariable);
        return {
            id: staticalVariable.ID_VARIABLE,
            name: staticalVariable.NOMBRE,
            abbreviation: staticalVariable.ABREVIATURA,
            digits: staticalVariable.DIGITOS,
            observation: staticalVariable.OBSERVACION,
            domain: staticalVariable.DOMINIO,
            approved: !!staticalVariable.SUPERVISADO,
            id_father: staticalVariable.ID_PADRE,
            createdAt: dateToString(staticalVariable.FECHA_ALTA),
            userCreator: staticalVariable.ID_USUARIO_ALTA,
            userDeleted: staticalVariable.ID_USUARIO_BAJA,
            deletedAt: dateToString(staticalVariable.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_VARIABLE: filters.id};
        const success = await staticalVariableModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = StaticalVariableService;

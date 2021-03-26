const { statisticalVariable: statisticalVariableModel } = include('models');
const { dateToString } = include('util');
class StatisticalVariableService {
    static async fetch() {
        const statisticalVariables = await statisticalVariableModel.find();
        return statisticalVariables.map(variable => ({
            id: variable.ID_VARIABLE,
            name: variable.NOMBRE,
            abbreviation: variable.ABREVIATURA,
            digits: variable.DIGITOS,
            approved: variable.SUPERVISADO,
            domain: variable.DOMINIO,
            observation: variable.OBSERVACION,
            parentId: variable.ID_PADRE,
            userId: variable.ID_USUARIO,
            createdAt: dateToString(variable.FECHA_ALTA)
        }));
    }
    static async findOne(params) {
        const variable = await statisticalVariableModel.findOne({ID_VARIABLE: params.id});
        return {
            id: variable.ID_VARIABLE,
            name: variable.NOMBRE,
            abbreviation: variable.ABREVIATURA,
            digits: variable.DIGITOS,
            approved: variable.SUPERVISADO,
            domain: variable.DOMINIO,
            observation: variable.OBSERVACION,
            parentId: variable.ID_PADRE,
            userId: variable.ID_USUARIO,
            createdAt: dateToString(variable.FECHA_ALTA)
        };
    }
    static async create(params, userCreator) {
        const formattedStatisticalVariable = {
            ID_VARIABLE: params.id,
            NOMBRE: params.name,
            ABREVIATURA: params.abbreviation,
            DIGITOS: params.digits,
            SUPERVISADO: params.approved,
            DOMINIO: params.domain,
            OBSERVACION: params.observation,
            ID_PADRE: params.parentId,
            ID_USUARIO: userCreator,
            FECHA_ALTA: new Date()
        };
        const statisticalVariable = await statisticalVariableModel.insertOne(formattedStatisticalVariable);

        return {
            id: statisticalVariable.ID_VARIABLE,
            name: statisticalVariable.NOMBRE,
            abbreviation: statisticalVariable.ABREVIATURA,
            digits: statisticalVariable.DIGITOS,
            approved: statisticalVariable.SUPERVISADO,
            domain: statisticalVariable.DOMINIO,
            observation: statisticalVariable.OBSERVACION,
            parentId: statisticalVariable.ID_PADRE,
            userId: statisticalVariable.ID_USUARIO,
            createdAt: dateToString(statisticalVariable.FECHA_ALTA)
        };
    }
    static async update(filters, params){
        const formattedVariable = {
            ID_VARIABLE: params.id,
            NOMBRE: params.name,
            ABREVIATURA: params.abbreviation,
            DIGITOS: params.digits,
            SUPERVISADO: params.approved,
            DOMINIO: params.domain,
            OBSERVACION: params.observation,
            ID_PADRE: params.parentId
        };
        const formattedFilters = {ID_VARIABLE: filters.id};
        const variable = await statisticalVariableModel.updateOne(formattedFilters, formattedVariable);
        return {
            id: variable.ID_VARIABLE,
            name: variable.NOMBRE,
            abbreviation: variable.ABREVIATURA,
            digits: variable.DIGITOS,
            approved: variable.SUPERVISADO,
            domain: variable.DOMINIO,
            observation: variable.OBSERVACION,
            parentId: variable.ID_PADRE,
            userId: variable.ID_USUARIO,
            createdAt: dateToString(variable.FECHA_ALTA)
        };
    }
}

module.exports = StatisticalVariableService;

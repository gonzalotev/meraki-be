const { staticalVariable: staticalVariableModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const uniq = require('lodash/uniq');
const map = require('lodash/map');
const find = require('lodash/find');

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
    static async shortFetch(data) {
        const staticalVariables = await staticalVariableModel.find(
            {SUPERVISADO: true, FECHA_BAJA: null},
            ['ID_VARIABLE', 'NOMBRE', 'ABREVIATURA'],
            [{column: 'NOMBRE', order: 'asc'}]
        );
        const variables = staticalVariables.map(staticalVariable => ({
            id: staticalVariable.ID_VARIABLE,
            name: staticalVariable.NOMBRE,
            abbreviation: staticalVariable.ABREVIATURA
        }));
        return data.variables = variables;
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
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const staticalVariableId = await staticalVariableModel.insertOne(formattedStaticalVariable, ['ID_VARIABLE']);
        const staticalVariable = await StaticalVariableService.findOne({id: staticalVariableId});
        return staticalVariable;

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

    static async update(filters, params, transaction){
        const formattedStaticalVariable = {
            ID_VARIABLE: trim(params.id),
            NOMBRE: trim(params.name),
            ABREVIATURA: trim(params.abbreviation),
            DIGITOS: params.digits,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_PADRE: trim(params.id_father),
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: new Date()
        };
        const staticalVariableId = await staticalVariableModel.updateOne(
            {ID_VARIABLE: filters.id}, formattedStaticalVariable, ['ID_VARIABLE'], transaction);
        const staticalVariable = await StaticalVariableService.findOne({id: staticalVariableId});
        return staticalVariable;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_VARIABLE: filters.id};
        const success = await staticalVariableModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async includeVariables(resourceArray){
        const variablesIds = uniq(map(resourceArray, resource => resource.variableId));
        const variables = await staticalVariableModel.getVariables(variablesIds);
        const resourceArrayWithVariables = map(resourceArray, value => {
            const variable = find(variables, variable => variable.id === value.variableId);
            value.variable = variable;
            return value;
        });
        return resourceArrayWithVariables;
    }
    static async getVariableData(resources){
        const variablesIds = uniq(map(resources, resource => resource.variableId));
        let variables = await staticalVariableModel.findByValues('ID_VARIABLE', variablesIds);
        variables = map(variables, variable => ({
            id: variable.ID_VARIABLE,
            name: variable.NOMBRE,
            abbreviation: variable.ABREVIATURA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.variable = find(variables, variable => variable.id === resource.variableId);
            return resource;
        });
    }
}

module.exports = StaticalVariableService;

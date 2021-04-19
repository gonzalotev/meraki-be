const { statisticalVariable: statisticalVariableModel } = include('models');
const { dateToString } = include('util');

class StatisticalVariableService {
    static async fetch() {
        const statisticalVariables = await statisticalVariableModel.find();
        return statisticalVariables.map(statisticalVariable => ({
            id: statisticalVariable.ID_VARIABLE,
            name: statisticalVariable.NOMBRE,
            abbreviation: statisticalVariable.ABREVIATURA,
            digits: statisticalVariable.DIGITOS,
            approved: statisticalVariable.SUPERVISADO,
            domain: statisticalVariable.DOMINIO,
            observation: statisticalVariable.OBSERVACION,
            id_father: statisticalVariable.ID_PADRE,
            userId: statisticalVariable.ID_USUARIO,
            createdAt: dateToString(statisticalVariable.FECHA_ALTA)
        }));
    }
    static async create(params, userCreator) {
        const formattedStatisticalVariable = {
            ID_VARIABLE: params.id,
            NOMBRE: params.name,
            ABREVIATURA: params.abbreviation,
            DIGITOS: params.digits,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
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
            id_father: statisticalVariable.ID_PADRE,
            userId: statisticalVariable.ID_USUARIO,
            createdAt: dateToString(statisticalVariable.FECHA_ALTA)
        };
    }

    static async findOne(filters){
        const statisticalVariable = await statisticalVariableModel.findById({ID_VARIABLE: filters.id});
        return {
            id: statisticalVariable.ID_VARIABLE,
            name: statisticalVariable.NOMBRE,
            abbreviation: statisticalVariable.ABREVIATURA,
            digits: statisticalVariable.DIGITOS,
            approved: statisticalVariable.SUPERVISADO,
            domain: statisticalVariable.DOMINIO,
            observation: statisticalVariable.OBSERVACION,
            id_father: statisticalVariable.ID_PADRE,
            userId: statisticalVariable.ID_USUARIO,
            createdAt: dateToString(statisticalVariable.FECHA_ALTA)
        };
    }

    static async update(filters, params){
        const formattedStatisticalVariable = {
            ID_VARIABLE: null,
            NAME: params.name,
            ABREVIATURA: params.abbreviation,
            DIGITOS: params.digits,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: params.deletedAt,
            FECHA_ALTA: new Date()
        };
        const statisticalVariable = await statisticalVariableModel.updateOne({ID_VARIABLE: filters.id},
            formattedStatisticalVariable);
        return {
            id: statisticalVariable.ID_VARIABLE,
            name: statisticalVariable.NOMBRE,
            abbreviation: statisticalVariable.ABREVIATURA,
            digits: statisticalVariable.DIGITOS,
            approved: statisticalVariable.SUPERVISADO,
            domain: statisticalVariable.DOMINIO,
            observation: statisticalVariable.OBSERVACION,
            id_father: statisticalVariable.ID_PADRE,
            userId: statisticalVariable.ID_USUARIO,
            createdAt: dateToString(statisticalVariable.FECHA_ALTA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_VARIABLE: filters.id};
        const success = await statisticalVariableModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = StatisticalVariableService;

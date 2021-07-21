const { assignmentRolesOperativeVariable: AssignmentRolesOperativeVariableModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class AssignmentRolesOperativeVariableService {
    static async fetch(query) {
        const assignmentsRolesOperativeVariables = await AssignmentRolesOperativeVariableModel.findByPage(
            query.page,
            [],
            AssignmentRolesOperativeVariableModel.selectableProps,
            [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
        );
        return assignmentsRolesOperativeVariables.map(AssignmentRolesOperativeVariable => ({
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        }));
    }

    static async create(params) {
        const formattedAssignmentRolesOperativeVariable = {
            ID_USUARIO: trim(params.idUser),
            ID_ROL_USUARIO: trim(params.id),
            ID_OPERATIVO: trim(params.operativeId),
            ID_LOTE: trim(params.lotId),
            ID_VARIABLE: trim(params.variableId),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SI_NO: params.yes_no,
            NOMBRE_USUARIO: trim(params.userName),
            VARIABLE: trim(params.variable),
            OPERATIVO: trim(params.operative),
            LOTE: trim(params.lot),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const AssignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableModel.
            insertOne(formattedAssignmentRolesOperativeVariable);

        return {
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const AssignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableModel.findById({
            ID_ROL_USUARIO: filters.id
        });
        return {
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await AssignmentRolesOperativeVariableModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params) {
        const formattedAssignmentRolesOperativeVariable = {
            ID_USUARIO: trim(params.idUser),
            ID_ROL_USUARIO: trim(params.id),
            ID_OPERATIVO: trim(params.operativeId),
            ID_LOTE: trim(params.lotId),
            ID_VARIABLE: trim(params.variableId),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SI_NO: params.yes_no,
            NOMBRE_USUARIO: trim(params.userName),
            VARIABLE: trim(params.variable),
            OPERATIVO: trim(params.operative),
            LOTE: trim(params.lot),
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const AssignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableModel.updateOne(
            { ID_ROL_USUARIO: params.id, ID_USUARIO: params.idUser},
            formattedAssignmentRolesOperativeVariable
        );
        return {
            idUser: AssignmentRolesOperativeVariable.ID_USUARIO,
            id: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yes_no: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id };
        const success = await AssignmentRolesOperativeVariableModel.deleteOne(formattedFilters,
            {FECHA_BAJA: new Date()
            });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'NOMBRE_USUARIO',
                    nameInFile: 'USUARIO'
                },
                {
                    nameInTable: 'ID_ROL_USUARIO',
                    nameInFile: 'ROL'
                },
                {
                    nameInTable: 'ID_OPERATIVO',
                    nameInFile: 'ID DE OPERATIVO'
                },
                {
                    nameInTable: 'OPERATIVO',
                    nameInFile: 'OPERATIVO'
                },
                {
                    nameInTable: 'ID_LOTE',
                    nameInFile: 'ID DE LOTE'
                },
                {
                    nameInTable: 'LOTE',
                    nameInFile: 'LOTE'
                },
                {
                    nameInTable: 'ID_VARIABLE',
                    nameInFile: 'ID DE VARIABLE'
                },
                {
                    nameInTable: 'VARIABLE',
                    nameInFile: 'VARIABLE'
                },
                {
                    nameInTable: 'SI_NO',
                    nameInFile: 'SI_NO'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = AssignmentRolesOperativeVariableModel.knex.select(tableHeaders)
                .from(AssignmentRolesOperativeVariableModel.tableName)
                .orderBy([{column: 'NOMBRE_USUARIO', order: 'asc'}])
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function() {
                resolve(csvString);
            });
        });
    }
}

module.exports = AssignmentRolesOperativeVariableService;

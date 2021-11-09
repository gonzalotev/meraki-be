const { assignmentRolesOperativeVariable: AssignmentModel } = include('models');
const { dateToString, stringToDate, getOffset, getPageSize } = include('util');
const trim = require('lodash/trim');
const head = require('lodash/head');

class AssignmentRolesOperativeVariableService {
    static async fetch(query) {
        const assignmentQuery = AssignmentModel.knex
            .select(AssignmentModel.selectableProps)
            .from(AssignmentModel.tableName);
        if(query.orderBy){
            assignmentQuery.orderBy([query.orderBy]);
        }
        if(query.search){
            assignmentQuery.where('NOMBRE_USUARIO', 'like', `%${query.search}%`);
            assignmentQuery.orWhere('ID_ROL_USUARIO', 'like', `%${query.search}%`);
            assignmentQuery.orWhere('ID_USUARIO', 'like', `%${query.search}%`);
        }
        if(query.page){
            if(query.limit) {
                assignmentQuery.limit(query.limit);
                assignmentQuery.offset(getOffset(query.page, query.limit));
            } else {
                assignmentQuery.limit(getPageSize());
                assignmentQuery.offset(getOffset(query.page));
            }
        }

        assignmentQuery.timeout(AssignmentModel.timeout);
        const assignments = await assignmentQuery;
        return assignments.map(assignment => ({
            userId: assignment.ID_USUARIO,
            roleId: assignment.ID_ROL_USUARIO,
            operativeId: assignment.ID_OPERATIVO,
            lotId: assignment.ID_LOTE,
            variableId: assignment.ID_VARIABLE,
            observation: assignment.OBSERVACION,
            domain: assignment.DOMINIO,
            yesNo: !!assignment.SI_NO,
            userName: assignment.NOMBRE_USUARIO,
            variable: assignment.VARIABLE,
            operative: assignment.OPERATIVO,
            lot: assignment.LOTE,
            createdAt: dateToString(assignment.FECHA_ALTA),
            deletedAt: dateToString(assignment.FECHA_BAJA)
        }));
    }

    static async getTotal(query) {
        const assignmentQuery = AssignmentModel.knex(AssignmentModel.tableName).count({ total: '*' });
        if(query.search){
            assignmentQuery.where('NOMBRE_USUARIO', 'like', `%${query.search}%`);
            assignmentQuery.orWhere('ID_ROL_USUARIO', 'like', `%${query.search}%`);
            assignmentQuery.orWhere('ID_USUARIO', 'like', `%${query.search}%`);
        }
        assignmentQuery.timeout(AssignmentModel.timeout);
        const { total } = head(await assignmentQuery);
        return total;
    }

    static async create(params) {
        const formattedAssignmentRolesOperativeVariable = {
            ID_USUARIO: params.userId,
            ID_ROL_USUARIO: params.roleId,
            ID_OPERATIVO: params.operativeId,
            ID_LOTE: params.lotId,
            ID_VARIABLE: params.variableId,
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SI_NO: params.yesNo,
            NOMBRE_USUARIO: trim(params.userName),
            VARIABLE: trim(params.variable),
            OPERATIVO: trim(params.operative),
            LOTE: trim(params.lot),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const AssignmentRolesOperativeVariable = await AssignmentModel.
            insertOne(formattedAssignmentRolesOperativeVariable);

        return {
            userId: AssignmentRolesOperativeVariable.ID_USUARIO,
            roleId: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yesNo: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const AssignmentRolesOperativeVariable = await AssignmentModel.findById({
            ID_ROL_USUARIO: filters.roleId
        });
        return {
            userId: AssignmentRolesOperativeVariable.ID_USUARIO,
            roleId: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yesNo: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedAssignmentRolesOperativeVariable = {
            ID_USUARIO: trim(params.userId),
            ID_ROL_USUARIO: trim(params.roleId),
            ID_OPERATIVO: trim(params.operativeId),
            ID_LOTE: trim(params.lotId),
            ID_VARIABLE: trim(params.variableId),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            SI_NO: params.yesNo,
            NOMBRE_USUARIO: trim(params.userName),
            VARIABLE: trim(params.variable),
            OPERATIVO: trim(params.operative),
            LOTE: trim(params.lot),
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const AssignmentRolesOperativeVariable = await AssignmentModel.updateOne(
            { ID_ROL_USUARIO: filters.roleId, ID_USUARIO: filters.userId},
            formattedAssignmentRolesOperativeVariable
        );
        return {
            userId: AssignmentRolesOperativeVariable.ID_USUARIO,
            roleId: AssignmentRolesOperativeVariable.ID_ROL_USUARIO,
            operativeId: AssignmentRolesOperativeVariable.ID_OPERATIVO,
            lotId: AssignmentRolesOperativeVariable.ID_LOTE,
            variableId: AssignmentRolesOperativeVariable.ID_VARIABLE,
            observation: AssignmentRolesOperativeVariable.OBSERVACION,
            domain: AssignmentRolesOperativeVariable.DOMINIO,
            yesNo: !!AssignmentRolesOperativeVariable.SI_NO,
            userName: AssignmentRolesOperativeVariable.NOMBRE_USUARIO,
            variable: AssignmentRolesOperativeVariable.VARIABLE,
            operative: AssignmentRolesOperativeVariable.OPERATIVO,
            lot: AssignmentRolesOperativeVariable.LOTE,
            createdAt: dateToString(AssignmentRolesOperativeVariable.FECHA_ALTA),
            deletedAt: dateToString(AssignmentRolesOperativeVariable.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.roleId };
        const success = await AssignmentModel.deleteOne(formattedFilters,
            {FECHA_BAJA: new Date()
            });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = AssignmentModel.knex.select(columns)
                .from(AssignmentModel.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
            });
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'NOMBRE_USUARIO',
                modified: 'USUARIO'
            },
            {
                original: 'ID_ROL_USUARIO',
                modified: 'ROL'
            },
            {
                original: 'ID_OPERATIVO',
                modified: 'ID DE OPERATIVO'
            },
            {
                original: 'OPERATIVO',
                modified: 'OPERATIVO'
            },
            {
                original: 'ID_LOTE',
                modified: 'ID DE LOTE'
            },
            {
                original: 'LOTE',
                modified: 'LOTE'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'ID DE VARIABLE'
            },
            {
                original: 'VARIABLE',
                modified: 'VARIABLE'
            },
            {
                original: 'SI_NO',
                modified: 'SI_NO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            }
        ];
    }
}

module.exports = AssignmentRolesOperativeVariableService;

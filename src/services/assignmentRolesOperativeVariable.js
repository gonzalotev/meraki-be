const { assignmentRolesOperativeVariable: AssignmentModel } = include('models');
const { dateToString, stringToDate, getOffset, getPageSize } = include('util');
const head = require('lodash/head');
const has = require('lodash/has');

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
        return assignments.map(assignment => AssignmentRolesOperativeVariableService.rebaseFormat(assignment));
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
        const formattedAssignmentRolesOperativeVariable = AssignmentRolesOperativeVariableService.formatData({
            ...params,
            deletedAt: null,
            createdAt: new Date()
        });
        const returnData = ['ID_USUARIO', 'ID_ROL_USUARIO', 'ID_OPERATIVO', 'ID_LOTE', 'ID_VARIABLE'];
        const ids = await AssignmentModel.insertOne(formattedAssignmentRolesOperativeVariable, returnData);
        return await AssignmentRolesOperativeVariableService.findOne(
            AssignmentRolesOperativeVariableService.rebaseFormat(ids)
        );
    }

    static async findOne(filters) {
        const AssignmentRolesOperativeVariable = await AssignmentModel.findById({
            ID_USUARIO: filters.userId,
            ID_ROL_USUARIO: filters.roleId,
            ID_OPERATIVO: filters.operativeId,
            ID_LOTE: filters.lotId,
            ID_VARIABLE: filters.variableId
        });
        return AssignmentRolesOperativeVariableService.rebaseFormat(AssignmentRolesOperativeVariable);
    }

    static async update(filters, params) {
        const formattedAssignmentRolesOperativeVariable = AssignmentRolesOperativeVariableService.formatData({
            ...params
        });
        const returnData = ['ID_USUARIO', 'ID_ROL_USUARIO', 'ID_OPERATIVO', 'ID_LOTE', 'ID_VARIABLE'];
        const ids = await AssignmentModel.updateOne(
            {
                ID_USUARIO: filters.userId,
                ID_ROL_USUARIO: filters.roleId,
                ID_OPERATIVO: filters.operativeId,
                ID_LOTE: filters.lotId,
                ID_VARIABLE: filters.variableId
            },
            formattedAssignmentRolesOperativeVariable,
            returnData
        );
        return await AssignmentRolesOperativeVariableService.findOne(
            AssignmentRolesOperativeVariableService.rebaseFormat(ids)
        );
    }

    static async delete(filters) {
        const formattedFilters = AssignmentRolesOperativeVariableService.formatData(filters);
        const success = await AssignmentModel.deleteOne(
            formattedFilters,
            {FECHA_BAJA: new Date()}
        );
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
                modified: 'ROL ID'
            },
            {
                original: 'ID_OPERATIVO',
                modified: 'OPERATIVO ID'
            },
            {
                original: 'OPERATIVO',
                modified: 'OPERATIVO'
            },
            {
                original: 'ID_LOTE',
                modified: 'LOTE ID'
            },
            {
                original: 'LOTE',
                modified: 'LOTE'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'VARIABLE ID'
            },
            {
                original: 'VARIABLE',
                modified: 'VARIABLE'
            },
            {
                original: 'SI_NO',
                modified: 'SI/NO'
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
    static rebaseFormat(assignment) {
        const rebaseAssignment = {};
        if(has(assignment, 'ID_USUARIO')){
            rebaseAssignment['userId'] = assignment.ID_USUARIO;
        }
        if(has(assignment, 'ID_ROL_USUARIO')){
            rebaseAssignment['roleId'] = assignment.ID_ROL_USUARIO;
        }
        if(has(assignment, 'ID_OPERATIVO')){
            rebaseAssignment['operativeId'] = assignment.ID_OPERATIVO;
        }
        if(has(assignment, 'ID_LOTE')){
            rebaseAssignment['lotId'] = assignment.ID_LOTE;
        }
        if(has(assignment, 'ID_VARIABLE')){
            rebaseAssignment['variableId'] = assignment.ID_VARIABLE;
        }
        if(has(assignment, 'OBSERVACION')){
            rebaseAssignment['observation'] = assignment.OBSERVACION;
        }
        if(has(assignment, 'DOMINIO')){
            rebaseAssignment['domain'] = assignment.DOMINIO;
        }
        if(has(assignment, 'SI_NO')){
            rebaseAssignment['yesNo'] = !!assignment.SI_NO;
        }
        if(has(assignment, 'NOMBRE_USUARIO')){
            rebaseAssignment['userName'] = assignment.NOMBRE_USUARIO;
        }
        if(has(assignment, 'VARIABLE')){
            rebaseAssignment['variable'] = assignment.VARIABLE;
        }
        if(has(assignment, 'OPERATIVO')){
            rebaseAssignment['operative'] = assignment.OPERATIVO;
        }
        if(has(assignment, 'LOTE')){
            rebaseAssignment['lot'] = assignment.LOTE;
        }
        if(has(assignment, 'FECHA_ALTA')){
            rebaseAssignment['createdAt'] = dateToString(assignment.FECHA_ALTA);
        }
        if(has(assignment, 'FECHA_BAJA')){
            rebaseAssignment['deletedAt'] = dateToString(assignment.FECHA_BAJA);
        }
        return rebaseAssignment;
    }

    static formatData(assignment) {
        const formatAssignment = {};
        if(has(assignment, 'userId')){
            formatAssignment['ID_USUARIO'] = assignment.userId;
        }
        if(has(assignment, 'roleId')){
            formatAssignment['ID_ROL_USUARIO'] = assignment.roleId;
        }
        if(has(assignment, 'operativeId')){
            formatAssignment['ID_OPERATIVO'] = assignment.operativeId;
        }
        if(has(assignment, 'lotId')){
            formatAssignment['ID_LOTE'] = assignment.lotId;
        }
        if(has(assignment, 'variableId')){
            formatAssignment['ID_VARIABLE'] = assignment.variableId;
        }
        if(has(assignment, 'observation')){
            formatAssignment['OBSERVACION'] = assignment.observation;
        }
        if(has(assignment, 'domain')){
            formatAssignment['DOMINIO'] = assignment.domain;
        }
        if(has(assignment, 'yesNo')){
            formatAssignment['SI_NO'] = assignment.yesNo;
        }
        if(has(assignment, 'userName')){
            formatAssignment['NOMBRE_USUARIO'] = assignment.userName;
        }
        if(has(assignment, 'variable')){
            formatAssignment['VARIABLE'] = assignment.variable;
        }
        if(has(assignment, 'operative')){
            formatAssignment['OPERATIVO'] = assignment.operative;
        }
        if(has(assignment, 'lot')){
            formatAssignment['LOTE'] = assignment.lot;
        }
        if(has(assignment, 'createdAt')){
            formatAssignment['FECHA_ALTA'] = stringToDate(assignment.createdAt);
        }
        if(has(assignment, 'deletedAt')){
            formatAssignment['FECHA_BAJA'] = stringToDate(assignment.deletedAt);
        }
        return formatAssignment;
    }

}

module.exports = AssignmentRolesOperativeVariableService;

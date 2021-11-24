const { assignmentRole: assignmentRoleModel } = include('models');
const { dateToString, stringToDate } = include('util');
const ArqService = require('./arq');
const trim = require('lodash/trim');

class AssignmentRoleService {
    static async fetch({ page, token }) {
        let assignmentsRoles = [];
        if (page) {
            assignmentsRoles = await assignmentRoleModel.findByPage(
                page,
                {FECHA_BAJA: null},
                assignmentRoleModel.selectableProps,
                [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
            );
        } else {
            assignmentsRoles = await assignmentRoleModel.find(
                {},
                assignmentRoleModel.selectableProps,
                [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
            );
        }

        assignmentsRoles = assignmentsRoles.map(assignmentRole => ({
            roleId: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            userId: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        }));
        await ArqService.getUserData(assignmentsRoles, token);
        return assignmentsRoles;
    }

    static async fetchDisabled({ page, token }) {
        let userDeletedTable = [];
        if (page) {
            userDeletedTable = await assignmentRoleModel.findByPage(
                page,
                {},
                assignmentRoleModel.selectableProps,
                [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
            ).whereNotNull('FECHA_BAJA', 'DESCRIPCION');
        } else {
            userDeletedTable = await assignmentRoleModel.find(
                {},
                assignmentRoleModel.selectableProps,
                [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
            ).whereNotNull('FECHA_BAJA', 'DESCRIPCION');
        }

        userDeletedTable = userDeletedTable.map(userDeletedTable => ({
            roleId: userDeletedTable.ID_ROL_USUARIO,
            description: userDeletedTable.DESCRIPCION,
            domain: userDeletedTable.DOMINIO,
            observation: userDeletedTable.OBSERVACION,
            userId: userDeletedTable.ID_USUARIO,
            userName: userDeletedTable.NOMBRE_USUARIO,
            createdAt: dateToString(userDeletedTable.FECHA_ALTA),
            deletedAt: dateToString(userDeletedTable.FECHA_BAJA)
        }));
        await ArqService.getUserData(userDeletedTable, token);
        return userDeletedTable;
    }

    static async create(params) {
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: params.roleId,
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: params.userId,
            NOMBRE_USUARIO: params.userName,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const returnValues = ['ID_ROL_USUARIO', 'ID_USUARIO'];
        const assignmentIds = await assignmentRoleModel.insertOne(formattedAssignmentRole, returnValues);
        return await AssignmentRoleService.findOne({
            roleId: assignmentIds.ID_ROL_USUARIO,
            userId: assignmentIds.ID_USUARIO
        });
    }

    static async findOne({ roleId, userId }) {
        const assignmentRole = await assignmentRoleModel.findById({
            ID_ROL_USUARIO: roleId,
            ID_USUARIO: userId
        });
        return assignmentRole ? {
            roleId: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            userId: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        } : null;
    }

    static async getTotal() {
        const { total } = await assignmentRoleModel.countTotal({ FECHA_BAJA: null });
        return total;
    }

    static async update({ userId, roleId }, params) {
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: params.roleId,
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: params.userId,
            NOMBRE_USUARIO: params.userName,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };

        const returnValues = ['ID_ROL_USUARIO', 'ID_USUARIO'];
        const assignmentIds = await assignmentRoleModel.updateOne(
            { ID_ROL_USUARIO: roleId, ID_USUARIO: userId },
            formattedAssignmentRole,
            returnValues
        );
        return await AssignmentRoleService.findOne({
            roleId: assignmentIds.ID_ROL_USUARIO,
            userId: assignmentIds.ID_USUARIO
        });
    }

    static async delete({ userId, roleId }) {
        const formattedFilters = { ID_ROL_USUARIO: roleId, ID_USUARIO: userId };
        const success = await assignmentRoleModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date()
        });
        return !!success;
    }

    static async fetchRoles({ userId, assigned, notAssigned }) {
        let assignedRoles = [];
        let notAssignedRoles = [];
        const result = {};
        if (assigned) {
            assignedRoles = await assignmentRoleModel.knex('TIPOS_DE_ROLES')
                .whereExists(function () {
                    this.select('*').from(assignmentRoleModel.tableName)
                        .whereRaw(`TIPOS_DE_ROLES.ID_ROL_USUARIO = ${assignmentRoleModel.tableName}.ID_ROL_USUARIO`)
                        .andWhere('ROLES_SICI.ID_USUARIO', '=', userId)
                        .andWhere({ ID_USUARIO: userId, FECHA_BAJA: null });
                })
                .where({ FECHA_BAJA: null })
                .orderBy([{ column: 'ID_ROL_USUARIO', order: 'asc' }]);
            result.assignedRoles = assignedRoles.map(role => ({
                id: role.ID_ROL_USUARIO,
                description: role.DESCRIPCION
            }));
        }
        if(notAssigned) {
            notAssignedRoles = await assignmentRoleModel.knex('TIPOS_DE_ROLES')
                .whereNotExists(function () {
                    this.select('*').from(assignmentRoleModel.tableName)
                        .whereRaw(`TIPOS_DE_ROLES.ID_ROL_USUARIO = ${assignmentRoleModel.tableName}.ID_ROL_USUARIO`)
                        .andWhere({ ID_USUARIO: userId, FECHA_BAJA: null });
                })
                .where({ FECHA_BAJA: null })
                .orderBy([{ column: 'ID_ROL_USUARIO', order: 'asc' }]);
            result.notAssignedRoles = notAssignedRoles.map(role => ({
                id: role.ID_ROL_USUARIO,
                description: role.DESCRIPCION
            }));
        }
        return result;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = assignmentRoleModel.knex.select(columns)
                .from(assignmentRoleModel.tableName)
                .where({ FECHA_BAJA: null })
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                worksheet.addRow(data);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'ID_ROL_USUARIO',
                modified: 'ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'ID_USUARIO',
                modified: 'ID USUARIO'
            },
            {
                original: 'NOMBRE_USUARIO',
                modified: 'USUARIO'
            }
        ];
    }
}

module.exports = AssignmentRoleService;

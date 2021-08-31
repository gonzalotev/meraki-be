const { assignmentRole: assignmentRoleModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const ArqService = require('./arq');
const trim = require('lodash/trim');
const map = require('lodash/map');

class AssignmentRoleService {
    static async fetch({ page, token }) {
        let assignmentsRoles = [];
        if (page) {
            assignmentsRoles = await assignmentRoleModel.findByPage(
                page,
                {},
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

        return {
            roleId: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            userId: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async getTotal(){
        const { total } = await assignmentRoleModel.countTotal({FECHA_BAJA: null});
        return total;
    }

    static async update({ userId, roleId }, params) {
        console.log(params);
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: params.id,
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: params.idUser,
            NOMBRE_USUARIO: params.userName,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const returnValues = ['ID_ROL_USUARIO', 'ID_USUARIO'];
        const assignmentIds = await assignmentRoleModel.updateOne(
            { ID_ROL_USUARIO: roleId, ID_USUARIO: userId},
            formattedAssignmentRole,
            returnValues
        );
        return await AssignmentRoleService.findOne({
            roleId: assignmentIds.ID_ROL_USUARIO,
            userId: assignmentIds.ID_USUARIO
        });
    }

    static async delete({ userId, roleId }) {
        const formattedFilters = { ID_ROL_USUARIO: roleId, ID_USUARIO: userId};
        const success = await assignmentRoleModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date()
        });
        return !!success;
    }

    static async fetchRoles({ userId, assigned }) {
        let roles = [];
        if (assigned) {
            roles = await assignmentRoleModel.knex('TIPOS_DE_ROLES')
                .whereExists(function() {
                    this.select('*').from(assignmentRoleModel.tableName)
                        .whereRaw(`TIPOS_DE_ROLES.ID_ROL_USUARIO = ${assignmentRoleModel.tableName}.ID_ROL_USUARIO`)
                        .andWhere('ROLES_SICI.ID_USUARIO', '=', userId)
                        .andWhere({ID_USUARIO: userId, FECHA_BAJA: null});
                })
                .orderBy([{column: 'ID_ROL_USUARIO', order: 'asc'}]);
        } else {
            roles = await assignmentRoleModel.knex('TIPOS_DE_ROLES')
                .whereNotExists(function() {
                    this.select('*').from(assignmentRoleModel.tableName)
                        .whereRaw(`TIPOS_DE_ROLES.ID_ROL_USUARIO = ${assignmentRoleModel.tableName}.ID_ROL_USUARIO`)
                        .andWhere({ID_USUARIO: userId, FECHA_BAJA: null});
                })
                .orderBy([{column: 'ID_ROL_USUARIO', order: 'asc'}]);
        }
        return roles.map(role => ({
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION
        }));
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
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                }
            ];
            const tableHeaders = map(fieldNames, field => field.nameInTable);
            const fileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = assignmentRoleModel.knex.select(tableHeaders)
                .from(assignmentRoleModel.tableName)
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

module.exports = AssignmentRoleService;

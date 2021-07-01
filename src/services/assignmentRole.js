const { assignmentRole: assignmentRoleModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class AssignmentRoleService {
    static async fetch(query) {
        const assignmentsRoles = await assignmentRoleModel.findByPage(
            query.page,
            [],
            assignmentRoleModel.selectableProps,
            [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
        );
        return assignmentsRoles.map(assignmentRole => ({
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        }));
    }

    static async create(params) {
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.idUser),
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const assignmentRole = await assignmentRoleModel.insertOne(formattedAssignmentRole);

        return {
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const assignmentRole = await assignmentRoleModel.findById({
            ID_ROL_USUARIO: filters.id
        });
        return {
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await assignmentRoleModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params) {
        const formattedAssignmentRole = {
            ID_ROL_USUARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.idUser),
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const assignmentRole = await assignmentRoleModel.updateOne(
            { ID_ROL_USUARIO: filters.id, ID_USUARIO: filters.idUser},
            formattedAssignmentRole
        );
        return {
            id: assignmentRole.ID_ROL_USUARIO,
            description: assignmentRole.DESCRIPCION,
            domain: assignmentRole.DOMINIO,
            observation: assignmentRole.OBSERVACION,
            idUser: assignmentRole.ID_USUARIO,
            userName: assignmentRole.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRole.FECHA_ALTA),
            deletedAt: dateToString(assignmentRole.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id, ID_USUARIO: filters.idUser };
        const success = await assignmentRoleModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date()
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

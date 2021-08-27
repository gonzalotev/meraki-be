const { assignmentRolesNomenclator: assignmentRolesNomenclatorModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class AssignmentRolesNomenclatorService {
    static async fetch(query) {
        const assignmentsRolesNomenclators = await assignmentRolesNomenclatorModel.findByPage(
            query.page,
            [],
            assignmentRolesNomenclatorModel.selectableProps,
            [{ column: 'NOMBRE_USUARIO', order: 'asc' }]
        );
        return assignmentsRolesNomenclators.map(assignmentRolesNomenclator => ({
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            userId: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: !!assignmentRolesNomenclator.SI_NO,
            userName: assignmentRolesNomenclator.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        }));
    }

    static async create(params) {
        const formattedAssignmentRolesNomenclator = {
            ID_ROL_USUARIO: trim(params.id),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            CLASIFICADOR: trim(params.nomenclator),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.userId),
            SI_NO: params.yes_no,
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.insertOne(
            formattedAssignmentRolesNomenclator);

        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            userId: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: !!assignmentRolesNomenclator.SI_NO,
            userName: assignmentRolesNomenclator.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async findOne({ id, userId }) {
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.findById({
            ID_ROL_USUARIO: id,
            ID_USUARIO: userId
        });

        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            userId: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: !!assignmentRolesNomenclator.SI_NO,
            userName: assignmentRolesNomenclator.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await assignmentRolesNomenclatorModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params) {
        const formattedAssignmentRolesNomenclator = {
            ID_ROL_USUARIO: trim(params.id),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            CLASIFICADOR: trim(params.nomenclator),
            DOMINIO: trim(params.domain),
            OBSERVACION: trim(params.observation),
            ID_USUARIO: trim(params.userId),
            SI_NO: params.yes_no,
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.updateOne(
            { ID_ROL_USUARIO: params.id, ID_USUARIO: params.userId },
            formattedAssignmentRolesNomenclator
        );
        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            userId: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: !!assignmentRolesNomenclator.SI_NO,
            userName: assignmentRolesNomenclator.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async delete(filters) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id };
        const success = await assignmentRolesNomenclatorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date()
        });
        return !!success;
    }

    static async fetchRoles({ userId, assigned, nomenclatorId }) {
        let roles = [];
        const filters = { FECHA_BAJA: null };
        if (nomenclatorId) {
            filters.ID_NOMENCLADOR = nomenclatorId;
        }
        if (assigned) {
            roles = await assignmentRolesNomenclatorModel.knex('ROLES_SICI')
                .whereExists(function () {
                    this.select('*').from(assignmentRolesNomenclatorModel.tableName)
                        .whereRaw(`ROLES_SICI.ID_ROL_USUARIO = ${assignmentRolesNomenclatorModel.tableName}.ID_ROL_USUARIO`)
                        .andWhereRaw(`ROLES_SICI.ID_USUARIO = ${assignmentRolesNomenclatorModel.tableName}.ID_USUARIO`)
                        .andWhere('RELACION_ROLES_USUARIOS_NOMENCLADORES.ID_NOMENCLADOR', '=', nomenclatorId);
                })
                .orderBy([{ column: 'ID_ROL_USUARIO', order: 'asc' }])
                .andWhere({ ID_USUARIO: userId });
        } else {
            roles = await assignmentRolesNomenclatorModel.knex('ROLES_SICI')
                .whereNotExists(function () {
                    this.select('*').from(assignmentRolesNomenclatorModel.tableName)
                        .whereRaw(`ROLES_SICI.ID_ROL_USUARIO = ${assignmentRolesNomenclatorModel.tableName}.ID_ROL_USUARIO`)
                        .andWhereRaw(`ROLES_SICI.ID_USUARIO = ${assignmentRolesNomenclatorModel.tableName}.ID_USUARIO`)
                        .andWhere('RELACION_ROLES_USUARIOS_NOMENCLADORES.ID_NOMENCLADOR', '=', nomenclatorId);
                })
                .orderBy([{ column: 'ID_ROL_USUARIO', order: 'asc' }])
                .andWhere({ ID_USUARIO: userId });
        }
        return roles.map(role => ({
            id: role.ID_ROL_USUARIO,
            description: role.DESCRIPCION
        }));
    }

    static getCsv() {
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
                    nameInTable: 'ID_NOMENCLADOR',
                    nameInFile: 'ID DE CLASIFICADOR'
                },
                {
                    nameInTable: 'CLASIFICADOR',
                    nameInFile: 'CLASIFICADOR'
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
            const stream = assignmentRolesNomenclatorModel.knex.select(tableHeaders)
                .from(assignmentRolesNomenclatorModel.tableName)
                .orderBy([{ column: 'NOMBRE_USUARIO', order: 'asc' }])
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function () {
                resolve(csvString);
            });
        });
    }
}

module.exports = AssignmentRolesNomenclatorService;

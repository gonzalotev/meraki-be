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
            idUser: assignmentRolesNomenclator.ID_USUARIO,
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
            ID_USUARIO: trim(params.idUser),
            SI_NO: params.yes_no,
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.
            insertOne(formattedAssignmentRolesNomenclator);

        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
            yes_no: !!assignmentRolesNomenclator.SI_NO,
            userName: assignmentRolesNomenclator.NOMBRE_USUARIO,
            createdAt: dateToString(assignmentRolesNomenclator.FECHA_ALTA),
            deletedAt: dateToString(assignmentRolesNomenclator.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.findById({
            ID_ROL_USUARIO: filters.id
        });
        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
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
            ID_USUARIO: trim(params.idUser),
            SI_NO: params.yes_no,
            NOMBRE_USUARIO: trim(params.userName),
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const assignmentRolesNomenclator = await assignmentRolesNomenclatorModel.updateOne(
            { ID_ROL_USUARIO: params.id, ID_USUARIO: params.idUser},
            formattedAssignmentRolesNomenclator
        );
        return {
            id: assignmentRolesNomenclator.ID_ROL_USUARIO,
            nomenclatorId: assignmentRolesNomenclator.ID_NOMENCLADOR,
            nomenclator: assignmentRolesNomenclator.CLASIFICADOR,
            domain: assignmentRolesNomenclator.DOMINIO,
            observation: assignmentRolesNomenclator.OBSERVACION,
            idUser: assignmentRolesNomenclator.ID_USUARIO,
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

module.exports = AssignmentRolesNomenclatorService;

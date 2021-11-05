const { rolesType: rolesTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class RolesTypeService {
    static async fetch() {
        const rolessTypes = await rolesTypeModel.find({ FECHA_BAJA: null });
        return rolessTypes.map(rolesType => ({
            id: rolesType.ID_ROL_USUARIO,
            description: rolesType.DESCRIPCION,
            observation: rolesType.OBSERVACION,
            domain: rolesType.DOMINIO,
            approved: rolesType.SUPERVISADO,
            createdAt: dateToString(rolesType.FECHA_ALTA),
            userCreator: rolesType.ID_USUARIO_ALTA,
            userDeleted: rolesType.ID_USUARIO_BAJA,
            deletedAt: dateToString(rolesType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedRolesType = {
            ID_ROL_USUARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const returnData = ['ID_ROL_USUARIO'];
        const id = await rolesTypeModel.insertOne(formattedRolesType, returnData);
        return await RolesTypeService.findOne({id});
    }

    static async findOne(filters) {
        const rolesType = await rolesTypeModel.findById({ ID_ROL_USUARIO: filters.id });
        return {
            id: rolesType.ID_ROL_USUARIO,
            description: rolesType.DESCRIPCION,
            observation: rolesType.OBSERVACION,
            domain: rolesType.DOMINIO,
            approved: rolesType.SUPERVISADO,
            createdAt: dateToString(rolesType.FECHA_ALTA),
            userCreator: rolesType.ID_USUARIO_ALTA,
            userDeleted: rolesType.ID_USUARIO_BAJA,
            deletedAt: dateToString(rolesType.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedRolesType = {
            ID_ROL_USUARIO: trim(params.id),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const returnData = ['ID_ROL_USUARIO'];
        const id = await rolesTypeModel.updateOne(
            { ID_ROL_USUARIO: filters.id },
            formattedRolesType,
            returnData
        );
        return await RolesTypeService.findOne({id});
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_ROL_USUARIO: filters.id };
        const success = await rolesTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = rolesTypeModel.knex.select(columns)
                .from(rolesTypeModel.tableName)
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
                modified: 'ROL ID'
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
            }
        ];
    }
}

module.exports = RolesTypeService;

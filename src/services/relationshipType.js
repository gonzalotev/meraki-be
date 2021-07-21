const { relationshipType: relationshipTypeModel } = include('models');
const { dateToString, stringToDate, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const toUpper = require('lodash/toUpper');

class RelationshipTypeService {
    static async fetch() {
        const relationshipsTypes = await relationshipTypeModel.find({FECHA_BAJA: null});
        return relationshipsTypes.map(relationshipType => ({
            id: relationshipType.ID_TIPO_RELACION,
            description: relationshipType.DESCRIPCION,
            observation: relationshipType.OBSERVACION,
            domain: relationshipType.DOMINIO,
            approved: !!relationshipType.SUPERVISADO,
            createdAt: dateToString(relationshipType.FECHA_ALTA),
            userCreator: relationshipType.ID_USUARIO_ALTA,
            userDeleted: relationshipType.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipType.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedRelationshipType = {
            ID_TIPO_RELACION: null,
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const relationshipTypeId = await relationshipTypeModel.insertOne(formattedRelationshipType, ['ID_TIPO_RELACION']);
        const relationshipType = await RelationshipTypeService.findOne({id: relationshipTypeId});
        return relationshipType;

    }

    static async findOne(filters){
        const relationshipType = await relationshipTypeModel.findById({ID_TIPO_RELACION: filters.id});
        return {
            id: relationshipType.ID_TIPO_RELACION,
            description: relationshipType.DESCRIPCION,
            observation: relationshipType.OBSERVACION,
            domain: relationshipType.DOMINIO,
            approved: !!relationshipType.SUPERVISADO,
            createdAt: dateToString(relationshipType.FECHA_ALTA),
            userCreator: relationshipType.ID_USUARIO_ALTA,
            userDeleted: relationshipType.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipType.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedRelationshipType = {
            ID_TIPO_RELACION: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const relationshipTypeId = await relationshipTypeModel.updateOne({ID_TIPO_RELACION: filters.id},
            formattedRelationshipType, ['ID_TIPO_RELACION']);
        const relationshipType = await RelationshipTypeService.findOne({id: relationshipTypeId});
        return relationshipType;
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_TIPO_RELACION: filters.id};
        const success = await relationshipTypeModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_TIPO_RELACION',
                    nameInFile: 'ID'
                },
                {
                    nameInTable: 'DESCRIPCION',
                    nameInFile: 'DESCRIPCIÓN'
                },
                {
                    nameInTable: 'SUPERVISADO',
                    nameInFile: 'SUPERVISADO'
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
            const stream = relationshipTypeModel.knex.select(tableHeaders)
                .from(relationshipTypeModel.tableName)
                .orderBy([{column: 'ID_TIPO_RELACION', order: 'asc'}])
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

module.exports = RelationshipTypeService;

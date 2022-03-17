const { relationshipType: relationshipTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const toUpper = require('lodash/toUpper');

class RelationshipTypeService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_TIPO_RELACION', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = relationshipTypeModel.selectableProps;
        let relationshipsTypes=[];
        if(page && search) {
            relationshipsTypes = await relationshipTypeModel.findByMatch(
                page,
                search,
                ['DESCRIPCION'],
                filterBy,
                orderBy
            );
        } else if(page){
            relationshipsTypes = await relationshipTypeModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            relationshipsTypes = await relationshipTypeModel.find();
        }

        relationshipsTypes = relationshipsTypes.map(relationshipType => ({
            id: relationshipType.ID_TIPO_RELACION,
            description: relationshipType.DESCRIPCION,
            observation: relationshipType.OBSERVACION,
            domain: relationshipType.DOMINIO,
            approved: !!relationshipType.SUPERVISADO,
            createdAt: dateToString(relationshipType.FECHA_ALTA),
            userCreator: relationshipType.ID_USUARIO_ALTA
        }));

        return relationshipsTypes;
    }

    static async getTotal({ relationship }) {
        let result;
        if (relationship) {
            result = await relationshipTypeModel.countTotal({ ID_TIPO_RELACION: relationship });
        } else {
            result = await relationshipTypeModel.countTotal();
        }
        return result.total;
    }

    static async create(params, userCreator) {
        const formattedRelationshipType = {
            ID_TIPO_RELACION: null,
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationshipTypeId = await relationshipTypeModel.insertOne(formattedRelationshipType, ['ID_TIPO_RELACION']);
        const relationshipType = await RelationshipTypeService.findOne({ id: relationshipTypeId });
        return relationshipType;

    }

    static async findOne(filters) {
        const relationshipType = await relationshipTypeModel.findById({ ID_TIPO_RELACION: filters.id });
        return {
            id: relationshipType.ID_TIPO_RELACION,
            description: relationshipType.DESCRIPCION,
            observation: relationshipType.OBSERVACION,
            domain: relationshipType.DOMINIO,
            approved: !!relationshipType.SUPERVISADO,
            createdAt: dateToString(relationshipType.FECHA_ALTA),
            userCreator: relationshipType.ID_USUARIO_ALTA
        };
    }

    static async update(filters, params) {
        const formattedRelationshipType = {
            ID_TIPO_RELACION: trim(params.id),
            DESCRIPCION: toUpper(trim(params.description)),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const relationshipTypeId = await relationshipTypeModel.updateOne({ ID_TIPO_RELACION: filters.id },
            formattedRelationshipType, ['ID_TIPO_RELACION']);
        const relationshipType = await RelationshipTypeService.findOne({ id: relationshipTypeId });
        return relationshipType;
    }

    static delete(relationshipTypeId) {
        return relationshipTypeModel.deleteOne({ID_TIPO_RELACION: relationshipTypeId});
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipTypeModel.knex.select(columns)
                .from(relationshipTypeModel.tableName)
                .where({})
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                const formattedData = map(data, function(value) {
                    if(isDate(value)) {
                        return dateToString(value);
                    }
                    return value;
                });
                worksheet.addRow(formattedData);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'ID_TIPO_RELACION',
                modified: 'TIPO RELACIÓN ID'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCIÓN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
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

module.exports = RelationshipTypeService;

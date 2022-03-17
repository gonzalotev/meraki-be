const { organizationType: organizationTypeModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class OrganizationTypeService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_TIPO_ORGANIZACION', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = organizationTypeModel.selectableProps;
        let organizationsTypes=[];
        if(page && search) {
            organizationsTypes = await organizationTypeModel.findByMatch(
                page,
                search,
                ['ID_TIPO_ORGANIZACION'],
                filterBy,
                orderBy
            );
        } else if(page){
            organizationsTypes = await organizationTypeModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            organizationsTypes = await organizationTypeModel.find();
        }

        organizationsTypes = organizationsTypes.map(organizationType => ({
            id: organizationType.ID_TIPO_ORGANIZACION,
            abbreviation: organizationType.ABREVIATURA,
            description: organizationType.DESCRIPCION,
            observation: organizationType.OBSERVACION,
            domain: organizationType.DOMINIO,
            approved: organizationType.SUPERVISADO,
            createdAt: dateToString(organizationType.FECHA_ALTA),
            userCreator: organizationType.ID_USUARIO_ALTA
        }));

        return organizationsTypes;
    }

    static async create(params, userCreator) {
        const formattedOrganizationType = {
            ID_TIPO_ORGANIZACION: trim(params.id),
            ABREVIATURA: trim(params.abbreviation),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const returnData = ['ID_TIPO_ORGANIZACION'];
        const id = await organizationTypeModel.insertOne(formattedOrganizationType, returnData);
        return await OrganizationTypeService.findOne({id});
    }

    static async findOne(filters){
        const organizationType = await organizationTypeModel.findById({ID_TIPO_ORGANIZACION: filters.id});
        return {
            id: organizationType.ID_TIPO_ORGANIZACION,
            abbreviation: organizationType.ABREVIATURA,
            description: organizationType.DESCRIPCION,
            observation: organizationType.OBSERVACION,
            domain: organizationType.DOMINIO,
            approved: !!organizationType.SUPERVISADO,
            createdAt: dateToString(organizationType.FECHA_ALTA),
            userCreator: organizationType.ID_USUARIO_ALTA
        };
    }

    static async getTotal({ nomenclator }) {
        let result;
        if (nomenclator) {
            result = await organizationTypeModel.countTotal({ ID_TIPO_ORGANIZACION: nomenclator });
        } else {
            result = await organizationTypeModel.countTotal();
        }
        return result.total;
    }

    static async update(filters, params){
        const formattedOrganizationType = {
            ID_TIPO_ORGANIZACION: params.id,
            ABREVIATURA: trim(params.abbreviation),
            DESCRIPCION: trim(params.description),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const returnData = ['ID_TIPO_ORGANIZACION'];
        const id = await organizationTypeModel.updateOne(
            {ID_TIPO_ORGANIZACION: filters.id},
            formattedOrganizationType,
            returnData
        );
        return await OrganizationTypeService.findOne({id});
    }

    static delete(organizationTypeId){
        return organizationTypeModel.deleteOne({ID_TIPO_ORGANIZACION: organizationTypeId});
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = organizationTypeModel.knex.select(columns)
                .from(organizationTypeModel.tableName)
                .where({})
                .stream();
            stream.on('error', function(err) {
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
            stream.on('end', function() {
                resolve(worksheet);
            });
        });
    }

    static getColumns(){
        return [
            {
                original: 'ID_TIPO_ORGANIZACION',
                modified: 'TIPO ORGANIZACIÓN ID'
            },
            {
                original: 'ABREVIATURA',
                modified: 'ABREVIATURA'
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

module.exports = OrganizationTypeService;

const { nomenclatorTypes } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class NomenclatorTypesService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_TIPO', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = nomenclatorTypes.selectableProps;
        let nomenclatorType=[];
        if(page && search) {
            nomenclatorType = await nomenclatorTypes.findByMatch(
                page,
                search,
                ['ID_TIPO'],
                filterBy,
                orderBy
            );
        } else if(page){
            nomenclatorType = await nomenclatorTypes.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            nomenclatorType = await nomenclatorTypes.find();
        }

        nomenclatorType = nomenclatorType.map(nomenclator => ({
            id: nomenclator.ID_TIPO,
            description: nomenclator.DESCRIPCION,
            supervised: !!nomenclator.SUPERVISADO,
            observation: nomenclator.OBSERVACION,
            domain: nomenclator.DOMINIO,
            createdAt: dateToString(nomenclator.FECHA_ALTA),
            userCreator: nomenclator.ID_USUARIO_ALTA
        }));

        return nomenclatorType;
    }

    static async getTotal({ nomenclator }) {
        let result;
        if (nomenclator) {
            result = await nomenclatorTypes.countTotal({ ID_TIPO: nomenclator });
        } else {
            result = await nomenclatorTypes.countTotal();
        }
        return result.total;
    }

    static async findOne(filters){
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorType = await nomenclatorTypes.findById(formattedFilters);
        return {
            id: nomenclatorType.ID_TIPO,
            description: nomenclatorType.DESCRIPCION,
            supervised: !!nomenclatorType.SUPERVISADO,
            observation: nomenclatorType.OBSERVACION,
            domain: nomenclatorType.DOMINIO,
            createdAt: dateToString(nomenclatorType.FECHA_ALTA),
            userCreator: nomenclatorType.ID_USUARIO_ALTA
        };
    }

    static async create(params, userCreator){
        const formattedNomenclatorType = {
            ID_TIPO: trim(params.id),
            DESCRIPCION: trim(params.description),
            SUPERVISADO: !!params.supervised,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const nomenclatorTypeId = await nomenclatorTypes.insertOne(formattedNomenclatorType, ['ID_TIPO']);
        const nomenclatorTypeReturn = await NomenclatorTypesService.findOne({id: nomenclatorTypeId});
        return nomenclatorTypeReturn;

    }

    static async update(filters, params){
        const formattedNomenclatorType = {
            ID_TIPO: trim(params.id),
            DESCRIPCION: trim(params.description),
            SUPERVISADO: !!params.supervised,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const formattedFilters = {ID_TIPO: filters.id};
        const nomenclatorTypeId = await nomenclatorTypes.updateOne(formattedFilters, formattedNomenclatorType, ['ID_TIPO']);
        const nomenclatorType = await NomenclatorTypesService.findOne({id: nomenclatorTypeId});
        return nomenclatorType;
    }

    static delete(nomenclatorTypesId){
        return nomenclatorTypes.deleteOne({ID_TIPO: nomenclatorTypesId});
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = nomenclatorTypes.knex.select(columns)
                .from(nomenclatorTypes.tableName)
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
                original: 'ID_TIPO',
                modified: 'TIPO ID'
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

module.exports = NomenclatorTypesService;

const { nomenclatures: nomenclaturesModel } = include('models');
const { dateToString, stringToDate } = include('util');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const uniq = require('lodash/uniq');
const find = require('lodash/find');
const compact = require('lodash/compact');
const isEmpty = require('lodash/isEmpty');

class NomenclaturesService {
    static async fetch({ page, search }) {
        const orderBy = [{ column: 'ABREVIATURA', order: 'asc' }];
        const filterBy = {};
        const columnsToSelect = nomenclaturesModel.selectableProps;
        let nomenclaturess = [];
        if (page && search) {
            nomenclaturess = await nomenclaturesModel.fetchByPageAndTerm(page, search);
        } else if (page) {
            nomenclaturess = await nomenclaturesModel.findByPage(page, filterBy, columnsToSelect, orderBy);
        } else {
            nomenclaturess = await nomenclaturesModel.find();
        }
        nomenclaturess = nomenclaturess.map(nomenclatures => ({
            nomenclatorId: nomenclatures.ID_NOMENCLADOR,
            nomenclatureId: nomenclatures.ID_NOMENCLATURA,
            abreviation: nomenclatures.ABREVIATURA,
            original: nomenclatures.ORIGINAL,
            description: nomenclatures.DESCRIPCION,
            fractionationOfWords: nomenclatures.FRACCIONADO_DE_PALABRAS,
            approved: nomenclatures.SUPERVISADO,
            coefficient: nomenclatures.COEFICIENTE,
            fatherNomenclatorId: nomenclatures.ID_PADRE_NOMENCLADOR,
            fatherNomenclatureId: nomenclatures.ID_PADRE_NOMENCLATURA,
            acronim: nomenclatures.ACRONIMO,
            observation: nomenclatures.OBSERVACION,
            domain: nomenclatures.DOMINIO,
            userCreator: nomenclatures.ID_USUARIO_ALTA,
            createdAt: dateToString(nomenclatures.FECHA_ALTA),
            userDeleted: nomenclatures.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclatures.FECHA_BAJA)
        }));

        return (nomenclaturess);
    }

    static async create(params, userCreator) {
        const formattedNomenclature = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            ABREVIATURA: params.abreviation,
            ORIGINAL: params.original,
            DESCRIPCION: params.description,
            FRACCIONADO_DE_PALABRAS: params.fractionationOfWords,
            SUPERVISADO: params.approved,
            COEFICIENTE: params.coefficient,
            ID_PADRE_NOMENCLADOR: params.fatherNomenclatorId,
            ID_PADRE_NOMENCLATURA: params.fatherNomenclatureId,
            ACRONIMO: params.acronim,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: userCreator,
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const nomenclature = await nomenclaturesModel.insertOne(formattedNomenclature, ['ID_NOMENCLADOR', 'ID_NOMENCLATURA', 'ABREVIATURA', 'DESCRIPCION']);
        const nomen = await NomenclaturesService.findOne(
            {
                nomenclatorId: nomenclature.ID_NOMENCLADOR,
                nomenclatureId: nomenclature.ID_NOMENCLATURA,
                abreviation: nomenclature.ABREVIATURA,
                description: nomenclature.DESCRIPCION
            }
        );
        return nomen;
    }

    static async getTotal({ search }) {
        const { total } = await nomenclaturesModel.countTotal({}, search, ['ABREVIATURA']);
        return total;
    }

    static async findOne(filters){
        const nomenclatures = await nomenclaturesModel.findById({ID_NOMENCLATURA: filters.nomenclatureId});
        return {
            nomenclatorId: nomenclatures.ID_NOMENCLADOR,
            nomenclatureId: nomenclatures.ID_NOMENCLATURA,
            abreviation: nomenclatures.ABREVIATURA,
            original: nomenclatures.ORIGINAL,
            description: nomenclatures.DESCRIPCION,
            fractionationOfWords: nomenclatures.FRACCIONADO_DE_PALABRAS,
            approved: nomenclatures.SUPERVISADO,
            coefficient: nomenclatures.COEFICIENTE,
            fatherNomenclatorId: nomenclatures.ID_PADRE_NOMENCLADOR,
            fatherNomenclatureId: nomenclatures.ID_PADRE_NOMENCLATURA,
            acronim: nomenclatures.ACRONIMO,
            observation: nomenclatures.OBSERVACION,
            domain: nomenclatures.DOMINIO,
            userCreator: nomenclatures.ID_USUARIO_ALTA,
            createdAt: dateToString(nomenclatures.FECHA_ALTA),
            userDeleted: nomenclatures.ID_USUARIO_BAJA,
            deletedAt: dateToString(nomenclatures.FECHA_BAJA)
        };
    }

    static async update(filters, params) {
        const formattedNomenclature = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            ABREVIATURA: params.abreviation,
            ORIGINAL: params.original,
            DESCRIPCION: params.description,
            FRACCIONADO_DE_PALABRAS: params.fractionationOfWords,
            SUPERVISADO: params.approved,
            COEFICIENTE: params.coefficient,
            ID_PADRE_NOMENCLADOR: params.fatherNomenclatorId,
            ID_PADRE_NOMENCLATURA: params.fatherNomenclatureId,
            ACRONIMO: params.acronim,
            OBSERVACION: params.observation,
            DOMINIO: params.domain,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            ID_USUARIO_BAJA: params.userDeleted,
            FECHA_BAJA: stringToDate(params.deletedAt)
        };
        // eslint-disable-next-line no-use-before-define
        const nomenclatureId = await nomenclaturesModel.updateOne({ ID_NOMENCLATURA: filters.nomenclatureId },
            formattedNomenclature, ['ID_NOMENCLATURA']);
        const nomenclature = await NomenclaturesService.findOne({ nomenclatureId: nomenclatureId });
        return nomenclature;
    }

    static async delete( filters ) {
        const formattedFilters = { ID_NOMENCLATURA: filters.nomenclatureId };
        const success = await nomenclaturesModel.delete(formattedFilters, {
        });
        return !!success;
    }

    static async getNomenclature(resources) {
        const nomenclatureIds = compact(uniq(map(resources, resource => resource.nomenclatureId)));
        if (isEmpty(nomenclatureIds)) {
            return resources;
        }
        let nomenclatures = await nomenclaturesModel.findByValues('ID_NOMENCLATURA', nomenclatureIds, nomenclaturesModel.selectableProps, []);
        nomenclatures = map(nomenclatures, nomenclature => ({
            nomenclatureId: nomenclature.ID_NOMENCLATURA,
            nomenclatorId: nomenclature.ID_NOMENCLADOR,
            abreviation: nomenclature.ABREVIATURA
        }));
        return map(resources, resource => {
            if (!resource.foreignData) {
                resource.foreignData = {};
            }
            resource.foreignData.nomenclature = find(
                nomenclatures,
                nomenclature => nomenclature.nomenclatureId === resource.nomenclatorId
            );
            return resource;
        });
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = nomenclaturesModel.knex.select(columns)
                .from(nomenclaturesModel.tableName)
                .where({FECHA_BAJA: null})
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
                original: 'ID_NOMENCLATURA',
                modified: 'NOMENCLATURA ID'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ABREVIATURA',
                modified: 'ABREVIATURA'
            },
            {
                original: 'DESCRIPCION',
                modified: 'DESCRIPCION'
            }
        ];
    }
}

module.exports = NomenclaturesService;

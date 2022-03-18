const { relationshipAutophrasesNomenclature: relationshipAutophrasesNomenclatureModel } = include('models');
const AutoPhraseService = require('./autoPhrase');
const NomenclatorsService = require('./nomenclators');
const NomenclaturesService = require('./nomenclatures');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RelationshipAutophrasesNomenclatureService {
    static async fetch({page, search}) {
        const orderBy = [{column: 'ID_NOMENCLADOR', order: 'asc'}];
        const filterBy = {};
        const columnsToSelect = relationshipAutophrasesNomenclatureModel.selectableProps;
        let relationshipsTypes=[];
        if(page && search) {
            relationshipsTypes = await relationshipAutophrasesNomenclatureModel.findByMatch(
                page,
                search,
                ['AUTOFRASE'],
                filterBy,
                orderBy
            );
        } else if(page){
            relationshipsTypes = await relationshipAutophrasesNomenclatureModel.findByPage(
                page,
                filterBy,
                columnsToSelect,
                orderBy);
        } else {
            relationshipsTypes = await relationshipAutophrasesNomenclatureModel.find(
                filterBy, columnsToSelect, orderBy);
        }

        relationshipsTypes = relationshipsTypes.map(relationshipAutophrasesNomenclature => ({
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        }));
        await AutoPhraseService.getAutophraseData(relationshipsTypes);
        await NomenclatorsService.getNomenclatorData(relationshipsTypes);
        await NomenclaturesService.getNomenclatureData(relationshipsTypes);

        return relationshipsTypes;
    }

    static async getTotal({ search }) {
        const { total } = await relationshipAutophrasesNomenclatureModel.countTotal({}, search, ['AUTOFRASE']);
        return total;
    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophrasesNomenclature = {
            ID_AUTOFRASE: trim(params.autophraseId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            AUTOFRASE: trim(params.id),
            NOMENCLATURA: trim(params.nomenclature),
            ID_VARIABLE: trim(params.variableId),
            ABREVIATURA: trim(params.abbreviation),
            VARIABLE_ESTADISTICA: trim(params.staticalVariable)
        };
        const relationshipAutophrasesNomenclatureId = await relationshipAutophrasesNomenclatureModel.
            insertOne(formattedRelationshipAutophrasesNomenclature, ['ID_AUTOFRASE', 'ID_NOMENCLADOR', 'ID_NOMENCLATURA']);
        const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.findOne(
            {
                autophraseId: relationshipAutophrasesNomenclatureId.ID_AUTOFRASE,
                nomenclatorId: relationshipAutophrasesNomenclatureId.ID_NOMENCLADOR,
                nomenclatureId: relationshipAutophrasesNomenclatureId.ID_NOMENCLATURA
            });
        return relationshipAutophrasesNomenclature;
    }

    static async findOne(filters) {
        const relationshipAutophrasesNomenclature = await relationshipAutophrasesNomenclatureModel.findById(
            {
                ID_AUTOFRASE: filters.autophraseId, ID_NOMENCLADOR: filters.nomenclatorId,
                ID_NOMENCLATURA: filters.nomenclatureId
            });
        return {
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        };
    }

    static async update(filters, params, userCreator) {
        const formattedRelationshipAutophrasesNomenclature = {
            ID_AUTOFRASE: trim(params.autophraseId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            AUTOFRASE: trim(params.id),
            NOMENCLATURA: trim(params.nomenclature),
            ID_VARIABLE: trim(params.variableId),
            ABREVIATURA: trim(params.abbreviation),
            VARIABLE_ESTADISTICA: trim(params.staticalVariable)
        };
        const relationshipAutophrasesNomenclatureId = await relationshipAutophrasesNomenclatureModel.updateOne(
            { ID_AUTOFRASE: filters.autophraseId },
            formattedRelationshipAutophrasesNomenclature, ['ID_AUTOFRASE', 'ID_NOMENCLADOR', 'ID_NOMENCLATURA']);
        const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.findOne(
            {
                autophraseId: relationshipAutophrasesNomenclatureId.ID_AUTOFRASE,
                nomenclatorId: relationshipAutophrasesNomenclatureId.ID_NOMENCLADOR,
                nomenclatureId: relationshipAutophrasesNomenclatureId.ID_NOMENCLATURA
            });
        return relationshipAutophrasesNomenclature;
    }

    static async delete(filters) {
        const formattedFilters = {
            ID_AUTOFRASE: filters.autophraseId,
            ID_NOMENCLADOR: filters.nomenclatorId, ID_NOMENCLATURA: filters.nomenclatureId
        };
        const success = await relationshipAutophrasesNomenclatureModel.delete(formattedFilters, {
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipAutophrasesNomenclatureModel.knex.select(columns)
                .from(relationshipAutophrasesNomenclatureModel.tableName)
                .where()
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
                original: 'ID_AUTOFRASE',
                modified: 'AUTOFRASE ID'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ID_NOMENCLATURA',
                modified: 'NOMENCLATURA ID'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'VARIABLE ID'
            },
            {
                original: 'VARIABLE_ESTADISTICA',
                modified: 'VARIABLE'
            },
            {
                original: 'ABREVIATURA',
                modified: 'ABREVIATURA'
            },
            {
                original: 'NOMENCLATURA',
                modified: 'NOMENCLATURA'
            },
            {
                original: 'AUTOFRASE',
                modified: 'AUTOFRASE'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'DOMINIO',
                modified: 'DOMINIO'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            }
        ];
    }
}

module.exports = RelationshipAutophrasesNomenclatureService;

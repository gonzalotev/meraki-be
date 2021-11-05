const { relationshipAutophrasesNomenclature: relationshipAutophrasesNomenclatureModel } = include('models');
const AutoPhraseService = require('./autoPhrase');
const NomenclatorsService = require('./nomenclators');
const NomenclaturesService = require('./nomenclatures');
const { dateToString, arrayToCsvFormat } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');

class RelationshipAutophrasesNomenclatureService {
    static async fetch() {
        let relationshipsTypes = await relationshipAutophrasesNomenclatureModel.find({ FECHA_BAJA: null });
        relationshipsTypes = relationshipsTypes.map(relationshipAutophrasesNomenclature => ({
            autophraseId: relationshipAutophrasesNomenclature.ID_AUTOFRASE,
            nomenclatorId: relationshipAutophrasesNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesNomenclature.ID_NOMENCLATURA,
            observation: relationshipAutophrasesNomenclature.OBSERVACION,
            domain: relationshipAutophrasesNomenclature.DOMINIO,
            approved: !!relationshipAutophrasesNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesNomenclature.FECHA_ALTA),
            userCreator: relationshipAutophrasesNomenclature.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA),
            id: relationshipAutophrasesNomenclature.AUTOFRASE,
            nomenclature: relationshipAutophrasesNomenclature.NOMENCLATURA,
            variableId: relationshipAutophrasesNomenclature.ID_VARIABLE,
            abbreviation: relationshipAutophrasesNomenclature.ABREVIATURA,
            staticalVariable: relationshipAutophrasesNomenclature.VARIABLE_ESTADISTICA
        }));
        await AutoPhraseService.getAutoPhrase(relationshipsTypes);
        await NomenclatorsService.getNomenclatorData(relationshipsTypes);
        await NomenclaturesService.getNomenclatureData(relationshipsTypes);

        return relationshipsTypes;

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
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
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
            userDeleted: relationshipAutophrasesNomenclature.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesNomenclature.FECHA_BAJA),
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
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
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

    static async delete(filters, userDeleted) {
        const formattedFilters = {
            ID_AUTOFRASE: filters.autophraseId,
            ID_NOMENCLADOR: filters.nomenclatorId, ID_NOMENCLATURA: filters.nomenclatureId
        };
        const success = await relationshipAutophrasesNomenclatureModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipAutophrasesNomenclatureModel.knex.select(columns)
                .from(relationshipAutophrasesNomenclatureModel.tableName)
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

    static getCsv() {
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [

            ];
            const tableHeaders = map(fieldNames, field => field.original);
            const fileHeaders = map(fieldNames, field => field.modified);
            const headers = arrayToCsvFormat(fileHeaders);
            csvString += headers;
            const stream = relationshipAutophrasesNomenclatureModel.knex.select(tableHeaders)
                .from(relationshipAutophrasesNomenclatureModel.tableName)
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

module.exports = RelationshipAutophrasesNomenclatureService;

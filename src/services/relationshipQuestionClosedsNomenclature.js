const { relationshipQuestionClosedsNomenclature: relationshipQuestionClosedsNomenclatureModel } = include('models');
const ClosedQuestionsService = require('./closedQuestions');
const NomenclatorsService = require('./nomenclators');
const NomenclaturesService = require('./nomenclatures');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RelationshipQuestionClosedsNomenclatureService {
    static async fetch() {
        let relationshipsTypes = await relationshipQuestionClosedsNomenclatureModel.find();
        relationshipsTypes = relationshipsTypes.map(relationshipQuestionClosedsNomenclature => ({
            closedQuestionId: relationshipQuestionClosedsNomenclature.ID_PREGUNTA_CERRADA,
            nomenclatorId: relationshipQuestionClosedsNomenclature.ID_NOMENCLADOR,
            nomenclatureId: relationshipQuestionClosedsNomenclature.ID_NOMENCLATURA,
            observation: relationshipQuestionClosedsNomenclature.OBSERVACION,
            domain: relationshipQuestionClosedsNomenclature.DOMINIO,
            approved: !!relationshipQuestionClosedsNomenclature.SUPERVISADO,
            createdAt: dateToString(relationshipQuestionClosedsNomenclature.FECHA_ALTA),
            userCreator: relationshipQuestionClosedsNomenclature.ID_USUARIO_ALTA
        }));
        await ClosedQuestionsService.getClosedQuestion(relationshipsTypes);
        await NomenclatorsService.getNomenclatorData(relationshipsTypes);
        await NomenclaturesService.getNomenclatureData(relationshipsTypes);

        return relationshipsTypes;

    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophrasesNomenclature = {
            ID_PREGUNTA_CERRADA: trim(params.closedQuestionId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesNomenclatureId = await relationshipQuestionClosedsNomenclatureModel.
            insertOne(formattedRelationshipAutophrasesNomenclature, ['ID_PREGUNTA_CERRADA', 'ID_NOMENCLADOR', 'ID_NOMENCLATURA']);
        const relationshipQuestionClosedsNomenclature = await RelationshipQuestionClosedsNomenclatureService.findOne(
            {
                closedQuestionId: relationshipAutophrasesNomenclatureId.ID_PREGUNTA_CERRADA,
                nomenclatorId: relationshipAutophrasesNomenclatureId.ID_NOMENCLADOR,
                nomenclatureId: relationshipAutophrasesNomenclatureId.ID_NOMENCLATURA
            });
        return relationshipQuestionClosedsNomenclature;
    }

    static async findOne(filters) {
        const ids = {
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_NOMENCLATURA: filters.nomenclatureId,
            ID_PREGUNTA_CERRADA: filters.closedQuestionId
        };
        let relationshipQuestionClosedsLetter = await relationshipQuestionClosedsNomenclatureModel.findById(ids);
        relationshipQuestionClosedsLetter = relationshipQuestionClosedsLetter ? {
            closedQuestionId: relationshipQuestionClosedsLetter.ID_PREGUNTA_CERRADA,
            nomenclatorId: relationshipQuestionClosedsLetter.ID_NOMENCLADOR,
            nomenclatureId: relationshipQuestionClosedsLetter.ID_NOMENCLATURA,
            observation: relationshipQuestionClosedsLetter.OBSERVACION,
            domain: relationshipQuestionClosedsLetter.DOMINIO,
            approved: !!relationshipQuestionClosedsLetter.SUPERVISADO,
            createdAt: dateToString(relationshipQuestionClosedsLetter.FECHA_ALTA),
            userCreator: relationshipQuestionClosedsLetter.ID_USUARIO_ALTA
        } : {};
        await NomenclatorsService.getNomenclatorData([relationshipQuestionClosedsLetter]);
        await NomenclaturesService.getNomenclatureData([relationshipQuestionClosedsLetter]);

        return relationshipQuestionClosedsLetter;
    }

    static async update(filters, params, userCreator) {
        const formattedRelationshipAutophrasesNomenclature = {
            ID_PREGUNTA_CERRADA: trim(params.closedQuestionId),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: trim(params.nomenclatorId),
            ID_NOMENCLATURA: trim(params.nomenclatureId),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesNomenclatureId = await relationshipQuestionClosedsNomenclatureModel.updateOne(
            { ID_PREGUNTA_CERRADA: filters.closedQuestionId },
            formattedRelationshipAutophrasesNomenclature, ['ID_PREGUNTA_CERRADA', 'ID_NOMENCLADOR', 'ID_NOMENCLATURA']);
        const relationshipQuestionClosedsNomenclature = await RelationshipQuestionClosedsNomenclatureService.findOne(
            {
                closedQuestionId: relationshipAutophrasesNomenclatureId.ID_PREGUNTA_CERRADA,
                nomenclatorId: relationshipAutophrasesNomenclatureId.ID_NOMENCLADOR,
                nomenclatureId: relationshipAutophrasesNomenclatureId.ID_NOMENCLATURA
            });
        return relationshipQuestionClosedsNomenclature;
    }

    static async delete(filters) {
        const formattedFilters = {
            ID_PREGUNTA_CERRADA: filters.closedQuestionId,
            ID_NOMENCLADOR: filters.nomenclatorId, ID_NOMENCLATURA: filters.nomenclatureId
        };
        const success = await relationshipQuestionClosedsNomenclatureModel.delete(formattedFilters, {
        });
        return !!success;
    }

    static async getTotal({ relationshipQuestionClosedsNomenclature }) {
        let result;
        if (relationshipQuestionClosedsNomenclature) {
            result = await relationshipQuestionClosedsNomenclatureModel.countTotal(
                { ID_NOMENCLATURA_AGRUPACION: relationshipQuestionClosedsNomenclature});
        } else {
            result = await relationshipQuestionClosedsNomenclatureModel.countTotal();
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipQuestionClosedsNomenclatureModel.knex.select(columns)
                .from(relationshipQuestionClosedsNomenclatureModel.tableName)
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

    static getColumns() {
        return [
            {
                original: 'ID_PREGUNTA_CERRADA',
                modified: 'PREGUNTA CERRADA ID'
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

module.exports = RelationshipQuestionClosedsNomenclatureService;

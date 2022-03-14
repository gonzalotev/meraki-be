const { relationshipAutophrasesLetter: relationshipQuestionClosedsLetterModel } = include('models');
// const AutoPhraseService = require('./autoPhrase');
const NomenclaturesGroupingService = require('./nomenclaturesGroupings');
const NomenclatorsService = require('./nomenclators');
const NomenclatorsGroupingService = require('./nomenclatorsGroupings');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RelationshipQuestionClosedsLetterService {
    static async fetch() {
        let relationshipsLetter = await relationshipQuestionClosedsLetterModel.find();
        relationshipsLetter = relationshipsLetter.map(relationshipAutophrasesLetter => ({
            nomenclatorId: relationshipAutophrasesLetter.ID_NOMENCLADOR,
            groupId: relationshipAutophrasesLetter.ID_AGRUPACION,
            nomenclatureGroupId: relationshipAutophrasesLetter.ID_NOMENCLATURA_AGRUPACION,
            questionClosedId: relationshipAutophrasesLetter.ID_PREGUNTA_CERRADA,
            observation: relationshipAutophrasesLetter.OBSERVACION,
            domain: relationshipAutophrasesLetter.DOMINIO,
            approved: !!relationshipAutophrasesLetter.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesLetter.FECHA_ALTA),
            userCreator: relationshipAutophrasesLetter.ID_USUARIO_ALTA
        }));
        // await AutoPhraseService.getAutoPhrase(relationshipsLetter);
        await NomenclatorsService.getNomenclatorData(relationshipsLetter);
        await NomenclatorsGroupingService.getNomenclatorsGroupingsData(relationshipsLetter);
        await NomenclaturesGroupingService.getNomenclaturesGroupingsData(relationshipsLetter);
        return relationshipsLetter;

    }

    static async create(params, userCreator) {
        const formattedRelationshipQuestionClosedsLetter = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_AGRUPACION: params.groupId,
            ID_NOMENCLATURA_AGRUPACION: trim(params.nomenclatureGroupId),
            ID_PREGUNTA_CERRADA: params.questionClosedId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesLetterId = await relationshipQuestionClosedsLetterModel.
            insertOne(formattedRelationshipQuestionClosedsLetter, ['ID_NOMENCLADOR', 'ID_AGRUPACION', 'ID_NOMENCLATURA_AGRUPACION', 'ID_PREGUNTA_CERRADA']);
        const relationshipAutophrasesLetter = await RelationshipQuestionClosedsLetterService.findOne(
            {
                nomenclatorId: relationshipAutophrasesLetterId.ID_NOMENCLADOR,
                groupId: relationshipAutophrasesLetterId.ID_AGRUPACION,
                nomenclatureGroupId: relationshipAutophrasesLetterId.ID_NOMENCLATURA_AGRUPACION,
                questionClosedId: relationshipAutophrasesLetterId.ID_PREGUNTA_CERRADA
            });
        return relationshipAutophrasesLetter;
    }

    static async findOne(filters) {
        const ids = {
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_AGRUPACION: filters.groupId,
            ID_NOMENCLATURA_AGRUPACION: filters.nomenclatureGroupId,
            ID_PREGUNTA_CERRADA: filters.questionClosedId
        };
        let relationshipAutophrasesLetter = await relationshipQuestionClosedsLetterModel.findById(ids);
        relationshipAutophrasesLetter = relationshipAutophrasesLetter ? {
            nomenclatorId: relationshipAutophrasesLetter.ID_NOMENCLADOR,
            groupId: relationshipAutophrasesLetter.ID_AGRUPACION,
            nomenclatureGroupId: relationshipAutophrasesLetter.ID_NOMENCLATURA_AGRUPACION,
            questionClosedId: relationshipAutophrasesLetter.ID_PREGUNTA_CERRADA,
            observation: relationshipAutophrasesLetter.OBSERVACION,
            domain: relationshipAutophrasesLetter.DOMINIO,
            approved: !!relationshipAutophrasesLetter.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesLetter.FECHA_ALTA),
            userCreator: relationshipAutophrasesLetter.ID_USUARIO_ALTA
        } : {};
        await NomenclatorsService.getNomenclatorData([relationshipAutophrasesLetter]);
        await NomenclatorsGroupingService.getNomenclatorsGroupingsData([relationshipAutophrasesLetter]);
        await NomenclaturesGroupingService.getNomenclaturesGroupingsData([relationshipAutophrasesLetter]);
        return relationshipAutophrasesLetter;
    }

    static async update(filters, params) {
        const formattedRelationshipQuestionClosedsLetter = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_AGRUPACION: params.groupId,
            ID_NOMENCLATURA_AGRUPACION: trim(params.nomenclatureGroupId),
            ID_PREGUNTA_CERRADA: params.questionClosedId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: new Date()
        };
        const ids = {
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_AGRUPACION: filters.groupId,
            ID_NOMENCLATURA_AGRUPACION: filters.nomenclatureGroupId,
            ID_PREGUNTA_CERRADA: filters.questionClosedId
        };
        const relationship = await relationshipQuestionClosedsLetterModel.updateOne(ids,
            formattedRelationshipQuestionClosedsLetter);
        return {
            nomenclatorId: relationship.ID_NOMENCLADOR,
            groupId: relationship.ID_AGRUPACION,
            nomenclatureGroupId: relationship.ID_NOMENCLATURA_AGRUPACION,
            questionClosedId: relationship.ID_PREGUNTA_CERRADA,
            observation: relationship.OBSERVACION,
            domain: relationship.DOMINIO,
            approved: !!relationship.SUPERVISADO,
            userCreator: relationship.ID_USUARIO_ALTA,
            createdAt: dateToString(relationship.FECHA_ALTA)
        };
    }

    static async delete({ nomenclatorId, groupId, nomenclatureGroupId, questionClosedId }) {
        const ids = { ID_NOMENCLADOR: nomenclatorId, ID_AGRUPACION: groupId,
            ID_NOMENCLATURA_AGRUPACION: nomenclatureGroupId, ID_PREGUNTA_CERRADA: questionClosedId };
        const success = await relationshipQuestionClosedsLetterModel.delete(ids, {
        });
        return !!success;
    }

    static async getTotal({ relationshipAutophrasesLetter }) {
        let result;
        if (relationshipAutophrasesLetter) {
            result = await relationshipQuestionClosedsLetterModel.countTotal(
                { ID_NOMENCLATURA_AGRUPACION: relationshipAutophrasesLetter});
        } else {
            result = await relationshipQuestionClosedsLetterModel.countTotal();
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipQuestionClosedsLetterModel.knex.select(columns)
                .from(relationshipQuestionClosedsLetterModel.tableName)
                .where()
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
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ID_AGRUPACION',
                modified: 'AGRUPACIÓN ID'
            },
            {
                original: 'ID_NOMENCLATURA_AGRUPACION',
                modified: 'NOMENCLATURA AGRUPACIÓN ID'
            },
            {
                original: 'ID_PREGUNTA_CERRADA',
                modified: 'AUTOFRASE ID'
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

module.exports = RelationshipQuestionClosedsLetterService;

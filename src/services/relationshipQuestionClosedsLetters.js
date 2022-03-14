const { relationshipQuestionClosedsLetter: relationshipQuestionClosedsLetterModel } = include('models');
const ClosedQuestionsService = require('./closedQuestions');
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
        relationshipsLetter = relationshipsLetter.map(relationshipQuestionClosedsLetter => ({
            nomenclatorId: relationshipQuestionClosedsLetter.ID_NOMENCLADOR,
            groupId: relationshipQuestionClosedsLetter.ID_AGRUPACION,
            nomenclatureGroupId: relationshipQuestionClosedsLetter.ID_NOMENCLATURA_AGRUPACION,
            closedQuestionId: relationshipQuestionClosedsLetter.ID_PREGUNTA_CERRADA,
            observation: relationshipQuestionClosedsLetter.OBSERVACION,
            domain: relationshipQuestionClosedsLetter.DOMINIO,
            approved: !!relationshipQuestionClosedsLetter.SUPERVISADO,
            createdAt: dateToString(relationshipQuestionClosedsLetter.FECHA_ALTA),
            userCreator: relationshipQuestionClosedsLetter.ID_USUARIO_ALTA
        }));
        await ClosedQuestionsService.getClosedQuestion(relationshipsLetter);
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
            ID_PREGUNTA_CERRADA: params.closedQuestionId,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationshipQuestionClosedsLetterId = await relationshipQuestionClosedsLetterModel.
            insertOne(formattedRelationshipQuestionClosedsLetter, ['ID_NOMENCLADOR', 'ID_AGRUPACION', 'ID_NOMENCLATURA_AGRUPACION', 'ID_PREGUNTA_CERRADA']);
        const relationshipQuestionClosedsLetter = await RelationshipQuestionClosedsLetterService.findOne(
            {
                nomenclatorId: relationshipQuestionClosedsLetterId.ID_NOMENCLADOR,
                groupId: relationshipQuestionClosedsLetterId.ID_AGRUPACION,
                nomenclatureGroupId: relationshipQuestionClosedsLetterId.ID_NOMENCLATURA_AGRUPACION,
                closedQuestionId: relationshipQuestionClosedsLetterId.ID_PREGUNTA_CERRADA
            });
        return relationshipQuestionClosedsLetter;
    }

    static async findOne(filters) {
        const ids = {
            ID_NOMENCLADOR: filters.nomenclatorId,
            ID_AGRUPACION: filters.groupId,
            ID_NOMENCLATURA_AGRUPACION: filters.nomenclatureGroupId,
            ID_PREGUNTA_CERRADA: filters.closedQuestionId
        };
        let relationshipQuestionClosedsLetter = await relationshipQuestionClosedsLetterModel.findById(ids);
        relationshipQuestionClosedsLetter = relationshipQuestionClosedsLetter ? {
            nomenclatorId: relationshipQuestionClosedsLetter.ID_NOMENCLADOR,
            groupId: relationshipQuestionClosedsLetter.ID_AGRUPACION,
            nomenclatureGroupId: relationshipQuestionClosedsLetter.ID_NOMENCLATURA_AGRUPACION,
            closedQuestionId: relationshipQuestionClosedsLetter.ID_PREGUNTA_CERRADA,
            observation: relationshipQuestionClosedsLetter.OBSERVACION,
            domain: relationshipQuestionClosedsLetter.DOMINIO,
            approved: !!relationshipQuestionClosedsLetter.SUPERVISADO,
            createdAt: dateToString(relationshipQuestionClosedsLetter.FECHA_ALTA),
            userCreator: relationshipQuestionClosedsLetter.ID_USUARIO_ALTA
        } : {};
        await NomenclatorsService.getNomenclatorData([relationshipQuestionClosedsLetter]);
        await NomenclatorsGroupingService.getNomenclatorsGroupingsData([relationshipQuestionClosedsLetter]);
        await NomenclaturesGroupingService.getNomenclaturesGroupingsData([relationshipQuestionClosedsLetter]);
        return relationshipQuestionClosedsLetter;
    }

    static async update(filters, params) {
        const formattedRelationshipQuestionClosedsLetter = {
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_AGRUPACION: params.groupId,
            ID_NOMENCLATURA_AGRUPACION: trim(params.nomenclatureGroupId),
            ID_PREGUNTA_CERRADA: params.closedQuestionId,
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
            ID_PREGUNTA_CERRADA: filters.closedQuestionId
        };
        const relationship = await relationshipQuestionClosedsLetterModel.updateOne(ids,
            formattedRelationshipQuestionClosedsLetter);
        return {
            nomenclatorId: relationship.ID_NOMENCLADOR,
            groupId: relationship.ID_AGRUPACION,
            nomenclatureGroupId: relationship.ID_NOMENCLATURA_AGRUPACION,
            closedQuestionId: relationship.ID_PREGUNTA_CERRADA,
            observation: relationship.OBSERVACION,
            domain: relationship.DOMINIO,
            approved: !!relationship.SUPERVISADO,
            userCreator: relationship.ID_USUARIO_ALTA,
            createdAt: dateToString(relationship.FECHA_ALTA)
        };
    }

    static async delete({ nomenclatorId, groupId, nomenclatureGroupId, closedQuestionId }) {
        const ids = { ID_NOMENCLADOR: nomenclatorId, ID_AGRUPACION: groupId,
            ID_NOMENCLATURA_AGRUPACION: nomenclatureGroupId, ID_PREGUNTA_CERRADA: closedQuestionId };
        const success = await relationshipQuestionClosedsLetterModel.delete(ids, {
        });
        return !!success;
    }

    static async getTotal({ relationshipQuestionClosedsLetter }) {
        let result;
        if (relationshipQuestionClosedsLetter) {
            result = await relationshipQuestionClosedsLetterModel.countTotal(
                { ID_NOMENCLATURA_AGRUPACION: relationshipQuestionClosedsLetter});
        } else {
            result = await relationshipQuestionClosedsLetterModel.countTotal();
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipQuestionClosedsLetterModel.knex.select(columns)
                .from(relationshipQuestionClosedsLetterModel.tableName)
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
                modified: 'PREGUNTA CERRADA ID'
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

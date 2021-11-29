const { relationshipAutophraseQuestionClosed } = include('models');
const QuestionService = require('./questions');
const NomenclatorsService = require('./nomenclators');
const AutoPhraseService = require('./autoPhrase');
const OperativeSourcesService = require('./operativeSources');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');

class RelationshipAutophraseQuestionClosedService {
    static async fetch({ page, source }) {
        let relations = [];
        if (page && source) {
            relations = await relationshipAutophraseQuestionClosed.findByPage(
                page,
                { ID_AUTOFRASE: source},
                relationshipAutophraseQuestionClosed.selectableProps,
                [{ column: 'ID_AUTOFRASE', order: 'asc' }, { column: 'ID_PREGUNTA	', order: 'asc' }]
            );
        } else {
            relations = await relationshipAutophraseQuestionClosed.find();
        }
        relations = relations.map(relation => ({
            autophraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA)
        }));
        // await RelationshipAutophraseQuestionClosedService.getSourceData(relations);
        // await NomenclatureService.getNomenclatureData(relations);
        await OperativeSourcesService.getSourceData(relations);
        await NomenclatorsService.getNomenclatorData(relations);
        await QuestionService.getQuestionData(relations);
        await AutoPhraseService.getAutoPhrase(relations);
        return relations;
    }

    static async findOne({ sourceId, questionId }) {
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        let relation = await relationshipAutophraseQuestionClosed.findById(ids);
        relation = relation ? {
            autophraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA)
        } : {};

        // await QuestionsTypeSerive.getQuestionTypeData(relation);
        return relation;
    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophraseQuestionClosed = {
            ID_AUTOFRASE: params.autophraseId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ABREVIATURA: params.abbreviation,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: !!params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationId = await relationshipAutophraseQuestionClosed
            .insertOne(formattedRelationshipAutophraseQuestionClosed, ['ID_AUTOFRASE', 'ID_FUENTE', 'ID_PREGUNTA']);
        const relation = await RelationshipAutophraseQuestionClosedService.findOne(
            { autophraseId: relationId.ID_AUTOFRASE,
                sourceId: relationId.ID_FUENTE,
                questionId: relationId.ID_PREGUNTA });
        return relation;
    }

    static async update(filters, params, userCreator) {
        const formattedRelationshipAutophraseQuestionClosed = {
            ID_AUTOFRASE: params.autophraseId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ABREVIATURA: params.abbreviation,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: !!params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const relationId = await relationshipAutophraseQuestionClosed.updateOne({ ID_AUTOFRASE: filters.autophraseId },
            formattedRelationshipAutophraseQuestionClosed, ['ID_AUTOFRASE', 'ID_FUENTE', 'ID_PREGUNTA']);
        const relation = await RelationshipAutophraseQuestionClosedService.findOne(
            { autophraseId: relationId.ID_AUTOFRASE,
                sourceId: relationId.ID_FUENTE,
                questionId: relationId.ID_PREGUNTA });
        return relation;
    }
    static async delete({ sourceId, questionId }) {
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        const success = await relationshipAutophraseQuestionClosed.delete(ids, {
        });
        return !!success;
    }

    static async getTotal({ source }) {
        let result;
        if (source) {
            result = await relationshipAutophraseQuestionClosed.countTotal({ ID_FUENTE: source });
        } else {
            result = await relationshipAutophraseQuestionClosed.countTotal();
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = relationshipAutophraseQuestionClosed.knex.select(columns)
                .from(relationshipAutophraseQuestionClosed.tableName)
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
                original: 'ID_AUTOFRASE',
                modified: 'AUTOFRASE ID'
            },
            {
                original: 'ID_FUENTE',
                modified: 'FUENTE ID'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA ID'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'CLASIFICADOR ID'
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

module.exports = RelationshipAutophraseQuestionClosedService;

const { relationshipAutophraseQuestionClosed } = include('models');
const StaticalVariableService = require('./staticalVariable');
const NomenclatorsService = require('./nomenclators');
const QuestionsTypeSerive = require('./questionType');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const {arrayToCsvFormat} = include('util');

class RelationshipAutophraseQuestionClosedService {
    static async fetch({page, source}) {
        let relations=[];
        if(page && source) {
            relations = await relationshipAutophraseQuestionClosed.findByPage(
                page,
                {ID_AUTOFRASE: source, FECHA_BAJA: null},
                relationshipAutophraseQuestionClosed.selectableProps,
                [{column: 'ID_AUTOFRASE', order: 'asc'}, {column: 'ID_PREGUNTA	', order: 'asc'}]
            );
        } else {
            relations = await relationshipAutophraseQuestionClosed.find({FECHA_BAJA: null});
        }
        relations = relations.map(relation => ({
            autophraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !! relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA)
        }));
        await RelationshipAutophraseQuestionClosedService.getSourceData(relations);
        await RelationshipAutophraseQuestionClosedService.getQuestionData(relations);
        await StaticalVariableService.getVariableData(relations);
        await NomenclatorsService.getNomenclatorData(relations);
        await QuestionsTypeSerive.getQuestionTypeData(relations);
        return relations;
    }

    static async findOne({sourceId, questionId}){
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        let relation = await relationshipAutophraseQuestionClosed.findById(ids);
        relation = relation ? {
            autophraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !! relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA)
        } : {};

        await QuestionsTypeSerive.getQuestionTypeData(relation);
        return relation;
    }

    static async create(params, userCreator){
        const formattedRelationshipAutophraseQuestionClosed = {
            ID_AUTOFRASE: params.autophraseId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ID_VARIABLE: params.variableId,
            ABREVIATURA: params.abbreviation,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: !! params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null
        };
        const relation = await relationshipAutophraseQuestionClosed
            .insertOne(formattedRelationshipAutophraseQuestionClosed);
        return {
            autophraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !! relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA)
        };
    }

    static async update({sourceId, questionId}, params, userCreator){
        const formattedRelationshipAutophraseQuestionClosed = {
            ID_AUTOFRASE: params.autophraseId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ID_VARIABLE: params.variableId,
            ABREVIATURA: params.abbreviation,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: !! params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null
        };
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        const relation = await relationshipAutophraseQuestionClosed
            .updateOne(ids, formattedRelationshipAutophraseQuestionClosed);
        return {
            autophraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !! relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA)
        };
    }
    static async delete({sourceId, questionId}, userDeleted){
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        const success = await relationshipAutophraseQuestionClosed.deleteOne(ids, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getTotal({source}){
        let result;
        if(source){
            result = await relationshipAutophraseQuestionClosed.countTotal({ID_FUENTE: source, FECHA_BAJA: null});
        } else {
            result = await relationshipAutophraseQuestionClosed.countTotal({FECHA_BAJA: null});
        }
        return result.total;
    }
    static getCsv(){
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [
                {
                    nameInTable: 'ID_FUENTE',
                    nameInFile: 'ID DE FUENTE'
                },
                {
                    nameInTable: 'ID_PREGUNTA',
                    nameInFile: 'ID DE PREGUNTA'
                },
                {
                    nameInTable: 'ID_NOMENCLADOR',
                    nameInFile: 'ID DE NOMENCLADOR'
                },
                {
                    nameInTable: 'OBSERVACION',
                    nameInFile: 'OBSERVACIÓN'
                },
                {
                    nameInTable: 'DOMINIO',
                    nameInFile: 'DOMINIO'
                }
            ];

            const relationshipAutophraseQuestionClosedTableHeaders = map(fieldNames, field => field.nameInTable);
            const relationshipAutophraseQuestionClosedFileHeaders = map(fieldNames, field => field.nameInFile);
            const headers = arrayToCsvFormat(relationshipAutophraseQuestionClosedFileHeaders);
            csvString += headers;
            const stream = relationshipAutophraseQuestionClosed.knex
                .select(relationshipAutophraseQuestionClosedTableHeaders)
                .from(relationshipAutophraseQuestionClosed.tableName)
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function() {
                resolve(csvString);
            });
        });
    }
}

module.exports = RelationshipAutophraseQuestionClosedService;
const { sourceQuestionRelation } = include('models');
const StaticalVariableService = require('./staticalVariable');
const NomenclatorsService = require('./nomenclators');
const QuestionsTypeService = require('./questionType');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const toNumber = require('lodash/toNumber');

class SourceQuestionRelationService {
    static async fetch({page, source}) {
        let relations=[];
        if(page && source) {
            relations = await sourceQuestionRelation.findByPage(
                page,
                {ID_FUENTE: source},
                sourceQuestionRelation.selectableProps,
                [{column: 'ID_FUENTE', order: 'asc'}, {column: 'CODIGO_PREGUNTA	', order: 'asc'}]
            );
        } else if(page){
            relations = await sourceQuestionRelation.findByPage(
                page,
                {},
                sourceQuestionRelation.selectableProps,
                [{column: 'ID_FUENTE', order: 'asc'}, {column: 'CODIGO_PREGUNTA', order: 'asc'}]
            );
        } else {
            relations = await sourceQuestionRelation.find();
        }
        relations = relations.map(relation => ({
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            questionCode: relation.CODIGO_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            nomenclatorId: relation.ID_NOMENCLADOR,
            questionTypeId: relation.ID_ABIERTA_CERRADA,
            isCodable: !!relation.SE_CODIFICA_SI_NO,
            shouldBeProcessed: !!relation.PASAR_A_PROCESAMIENTO_SI_NO,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA)
        }));
        await OperativeSourcesService.getSourceData(relations);
        await QuestionsService.getQuestionData(relations);
        await StaticalVariableService.getVariableData(relations);
        await NomenclatorsService.getNomenclatorData(relations);
        await QuestionsTypeService.getQuestionTypeData(relations);
        return relations;
    }

    static async findOne({sourceId, questionId}){
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        let relation = await sourceQuestionRelation.findById(ids);
        relation = relation ? {
            sourceId: toNumber(relation.ID_FUENTE),
            questionId: toNumber(relation.ID_PREGUNTA),
            questionCode: relation.CODIGO_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            nomenclatorId: relation.ID_NOMENCLADOR,
            questionTypeId: relation.ID_ABIERTA_CERRADA,
            isCodable: !!toNumber(relation.SE_CODIFICA_SI_NO),
            shouldBeProcessed: !!toNumber(relation.PASAR_A_PROCESAMIENTO_SI_NO),
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA)
        } : {};
        await StaticalVariableService.getVariableData([relation]);
        await NomenclatorsService.getNomenclatorData([relation]);
        await QuestionsTypeService.getQuestionTypeData(relation);
        return relation;
    }

    static async create(params, userCreator){
        const formattedSourceQuestionRelation = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            CODIGO_PREGUNTA: params.questionCode,
            ID_VARIABLE: params.variableId,
            ID_NOMENCLADOR: params.nomenclatorId ? params.nomenclatorId : null,
            ID_ABIERTA_CERRADA: params.questionTypeId,
            SE_CODIFICA_SI_NO: params.isCodable,
            PASAR_A_PROCESAMIENTO_SI_NO: params.shouldBeProcessed,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };

        const relationId = await sourceQuestionRelation.insertOne(formattedSourceQuestionRelation,
            ['ID_FUENTE', 'ID_PREGUNTA']);
        const relation = await SourceQuestionRelationService.findOne({sourceId: relationId.ID_FUENTE,
            questionId: relationId.ID_PREGUNTA});
        return relation;
    }

    static async update(filters, params){
        const formattedSourceQuestionRelation = {
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            CODIGO_PREGUNTA: params.questionCode,
            ID_VARIABLE: params.variableId,
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_ABIERTA_CERRADA: params.questionTypeId,
            SE_CODIFICA_SI_NO: params.isCodable,
            PASAR_A_PROCESAMIENTO_SI_NO: params.shouldBeProcessed,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: params.userCreator
        };
        const relationId = await sourceQuestionRelation.updateOne({ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId}, formattedSourceQuestionRelation, ['ID_FUENTE', 'ID_PREGUNTA']);
        const relation = await SourceQuestionRelationService.findOne({sourceId: relationId.ID_FUENTE,
            questionId: relationId.ID_PREGUNTA});
        return relation;
    }
    static async delete({sourceId, questionId}){
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        const success = await sourceQuestionRelation.delete(ids);
        return !!success;
    }

    static async getTotal({source}){
        let result;
        if(source){
            result = await sourceQuestionRelation.countTotal({ID_FUENTE: source});
        } else {
            result = await sourceQuestionRelation.countTotal({});
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = sourceQuestionRelation.knex.select(columns)
                .from(sourceQuestionRelation.tableName)
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
                original: 'ID_FUENTE',
                modified: 'FUENTE ID'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'PREGUNTA ID'
            },
            {
                original: 'CODIGO_PREGUNTA',
                modified: 'CÓDIGO DE PREGUNTA'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'VARIABLE ID'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'NOMENCLADOR ID'
            },
            {
                original: 'ID_ABIERTA_CERRADA',
                modified: 'PREGUNTA ABIERTA O CERRADA ID'
            },
            {
                original: 'SE_CODIFICA_SI_NO',
                modified: 'SE CODIFICA'
            },
            {
                original: 'PASAR_A_PROCESAMIENTO_SI_NO',
                modified: 'PASAR A PROCESAMIENTO SI/NO'
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

module.exports = SourceQuestionRelationService;

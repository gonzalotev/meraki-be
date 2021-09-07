const { sourceQuestionRelation } = include('models');
const StaticalVariableService = require('./staticalVariable');
const NomenclatorsService = require('./nomenclators');
const QuestionsTypeService = require('./questionType');
const OperativeSourcesService = require('./operativeSources');
const QuestionsService = require('./questions');
const { dateToString } = include('util');
const trim = require('lodash/trim');
const toNumber = require('lodash/toNumber');

class SourceQuestionRelationService {
    static async fetch({page, source}) {
        let relations=[];
        if(page && source) {
            relations = await sourceQuestionRelation.findByPage(
                page,
                {ID_FUENTE: source, FECHA_BAJA: null},
                sourceQuestionRelation.selectableProps,
                [{column: 'ID_FUENTE', order: 'asc'}, {column: 'CODIGO_PREGUNTA	', order: 'asc'}]
            );
        } else if(page){
            relations = await sourceQuestionRelation.findByPage(
                page,
                {FECHA_BAJA: null},
                sourceQuestionRelation.selectableProps,
                [{column: 'ID_FUENTE', order: 'asc'}, {column: 'CODIGO_PREGUNTA', order: 'asc'}]
            );
        } else {
            relations = await sourceQuestionRelation.find({FECHA_BAJA: null});
        }
        relations = relations.map(relation => ({
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            questionCode: relation.CODIGO_PREGUNTA,
            variableId: relation.ID_VARIABLE,
            nomenclatorId: relation.ID_NOMENCLADOR,
            questionTypeId: relation.ID_ABIERTA_CERRADA,
            isRequired: !!relation.ES_OBLIGATORIA_SI_NO,
            isCodable: !!relation.SE_CODIFICA_SI_NO,
            isAuxiliary: !!relation.ES_AUXILIAR_SI_NO,
            shouldBeProcessed: !!relation.PASAR_A_PROCESAMIENTO_SI_NO,
            souldHaveAuxiliary: !!relation.NECESITA_AUXILIARES_SI_NO,
            shouldReadAutoPhrase: !!relation.AUTOFRASE_LEER_SI_NO,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA)
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
            isRequired: !!toNumber(relation.ES_OBLIGATORIA_SI_NO),
            isCodable: !!toNumber(relation.SE_CODIFICA_SI_NO),
            isAuxiliary: !!toNumber(relation.ES_AUXILIAR_SI_NO),
            shouldBeProcessed: !!toNumber(relation.PASAR_A_PROCESAMIENTO_SI_NO),
            souldHaveAuxiliary: !!toNumber(relation.NECESITA_AUXILIARES_SI_NO),
            shouldReadAutoPhrase: !!toNumber(relation.AUTOFRASE_LEER_SI_NO),
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            userCreator: relation.ID_USUARIO_ALTA,
            userDeleted: relation.ID_USUARIO_BAJA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA)
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
            ES_OBLIGATORIA_SI_NO: params.isRequired,
            SE_CODIFICA_SI_NO: params.isCodable,
            ES_AUXILIAR_SI_NO: params.isAuxiliary,
            PASAR_A_PROCESAMIENTO_SI_NO: params.shouldBeProcessed,
            NECESITA_AUXILIARES_SI_NO: params.souldHaveAuxiliary,
            AUTOFRASE_LEER_SI_NO: params.shouldReadAutoPhrase,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null
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
            ES_OBLIGATORIA_SI_NO: params.isRequired,
            SE_CODIFICA_SI_NO: params.isCodable,
            ES_AUXILIAR_SI_NO: params.isAuxiliary,
            PASAR_A_PROCESAMIENTO_SI_NO: params.shouldBeProcessed,
            NECESITA_AUXILIARES_SI_NO: params.souldHaveAuxiliary,
            AUTOFRASE_LEER_SI_NO: params.shouldReadAutoPhrase,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userDeleted
        };
        const relationId = await sourceQuestionRelation.updateOne({ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId}, formattedSourceQuestionRelation, ['ID_FUENTE', 'ID_PREGUNTA']);
        const relation = await SourceQuestionRelationService.findOne({sourceId: relationId.ID_FUENTE,
            questionId: relationId.ID_PREGUNTA});
        return relation;
    }
    static async delete({sourceId, questionId}, userDeleted){
        const ids = {
            ID_FUENTE: sourceId,
            ID_PREGUNTA: questionId
        };
        const success = await sourceQuestionRelation.deleteOne(ids, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getTotal({source}){
        let result;
        if(source){
            result = await sourceQuestionRelation.countTotal({ID_FUENTE: source, FECHA_BAJA: null});
        } else {
            result = await sourceQuestionRelation.countTotal({FECHA_BAJA: null});
        }
        return result.total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = sourceQuestionRelation.knex.select(columns)
                .from(sourceQuestionRelation.tableName)
                .where({FECHA_BAJA: null})
                .stream();
            stream.on('error', function(err) {
                reject(err);
            });
            stream.on('data', function(data) {
                worksheet.addRow(data);
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
                modified: 'ID DE FUENTE'
            },
            {
                original: 'ID_PREGUNTA',
                modified: 'ID DE PREGUNTA'
            },
            {
                original: 'CODIGO_PREGUNTA',
                modified: 'CODIGO DE PREGUNTA'
            },
            {
                original: 'ID_VARIABLE',
                modified: 'ID DE VARIABLE'
            },
            {
                original: 'ID_NOMENCLADOR',
                modified: 'ID DE NOMENCLADOR'
            },
            {
                original: 'ID_ABIERTA_CERRADA',
                modified: 'PREGUNTA ABIERTA O CERRADA'
            },
            {
                original: 'ES_OBLIGATORIA_SI_NO',
                modified: 'ES OBLIGATORIA'
            },
            {
                original: 'SE_CODIFICA_SI_NO',
                modified: 'SE CODIFICA'
            },
            {
                original: 'ES_AUXILIAR_SI_NO',
                modified: 'ES AUXILIAR'
            },
            {
                original: 'PASAR_A_PROCESAMIENTO_SI_NO',
                modified: 'SE PROCESA'
            },
            {
                original: 'NECESITA_AUXILIARES_SI_NO',
                modified: 'NECESITA AUXILIAR'
            },
            {
                original: 'AUTOFRASE_LEER_SI_NO',
                modified: 'LEER AUTOFRASE'
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

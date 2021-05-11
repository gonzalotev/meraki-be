const { AutoPhraseClosedQuestion } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class AutoPhraseClosedQuestionService {
    static async fetch(query) {
        const relations = await AutoPhraseClosedQuestion.findByPage(
            query.page,
            {FECHA_BAJA: null}
        );
        return relations.map(relation => ({
            autoPhraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        }));
    }
    static async find(filters){
        const relation = await AutoPhraseClosedQuestion.findById({
            ID_AUTOFRASE: filters.autoPhraseId,
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId
        });
        return {
            autoPhraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        };
    }
    static async create(params, userCreator){
        const formattedAutoPhraseClosedQuestion = {
            ID_AUTOFRASE: params.autoPhraseId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ABREVIATURA: trim(params.abbreviation),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null
        };
        const relation = await AutoPhraseClosedQuestion.insertOne(formattedAutoPhraseClosedQuestion);
        return {
            autoPhraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        };
    }
    static async update(filters, params){
        const formattedAutoPhraseClosedQuestion = {
            ID_AUTOFRASE: params.autoPhraseId,
            ID_FUENTE: params.sourceId,
            ID_PREGUNTA: params.questionId,
            ABREVIATURA: trim(params.abbreviation),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            ID_NOMENCLADOR: params.nomenclatorId,
            ID_NOMENCLATURA: params.nomenclatureId,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            FECHA_BAJA: stringToDate(params.deletedAt),
            ID_USUARIO_BAJA: params.userDeleted
        };
        const relation = await AutoPhraseClosedQuestion.updateOne({
            ID_AUTOFRASE: filters.autoPhraseId,
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId
        }, formattedAutoPhraseClosedQuestion);
        return {
            autoPhraseId: relation.ID_AUTOFRASE,
            sourceId: relation.ID_FUENTE,
            questionId: relation.ID_PREGUNTA,
            abbreviation: relation.ABREVIATURA,
            observation: relation.OBSERVACION,
            domain: relation.DOMINIO,
            nomenclatorId: relation.ID_NOMENCLADOR,
            nomenclatureId: relation.ID_NOMENCLATURA,
            approved: !!relation.SUPERVISADO,
            userCreator: relation.ID_USUARIO_ALTA,
            createdAt: dateToString(relation.FECHA_ALTA),
            deletedAt: dateToString(relation.FECHA_BAJA),
            userDeleted: relation.ID_USUARIO_BAJA
        };
    }
    static async delete(filters, userDeleted){
        const success = await AutoPhraseClosedQuestion.deleteOne({
            ID_AUTOFRASE: filters.autoPhraseId,
            ID_FUENTE: filters.sourceId,
            ID_PREGUNTA: filters.questionId
        }, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = AutoPhraseClosedQuestionService;

const { relationshipAutophrasesQuestionClosed: relationshipAutophrasesQuestionClosedModel } = include('models');
const { dateToString } = include('util');
const AutoPhraseService = require('./autoPhrase');
const OperativeFontService = require('./operativeFonts');
const SourceQuestionRelationService = require('./sourceQuestionsRelations');
const trim = require('lodash/trim');

class RelationshipAutophrasesQuestionClosedService {
    static async fetch() {
        let relationshipsTypes = await relationshipAutophrasesQuestionClosedModel.find({FECHA_BAJA: null});
        relationshipsTypes =relationshipsTypes.map(relationshipAutophrasesQuestionClosed => ({
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            operativeFontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
            questionId: relationshipAutophrasesQuestionClosed.ID_PREGUNTA,
            abreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA,
            observation: relationshipAutophrasesQuestionClosed.OBSERVACION,
            domain: relationshipAutophrasesQuestionClosed.DOMINIO,
            nomenclatorId: relationshipAutophrasesQuestionClosed.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesQuestionClosed.ID_NOMENCLATURA,
            approved: !!relationshipAutophrasesQuestionClosed.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_ALTA),
            userCreator: relationshipAutophrasesQuestionClosed.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesQuestionClosed.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA),
            staticalVariable: relationshipAutophrasesQuestionClosed.VARIABLE_ESTADISTICA,
            id: relationshipAutophrasesQuestionClosed.AUTOFRASE,
            nomenclature: relationshipAutophrasesQuestionClosed.NOMENCLATURA,
            variableId: relationshipAutophrasesQuestionClosed.ID_VARIABLE,
            abbreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA_VARIABLE,
            variableIdFont: relationshipAutophrasesQuestionClosed.ID_VARIABLE_FUENTE,
            question: relationshipAutophrasesQuestionClosed.PREGUNTA,
            variableFont: relationshipAutophrasesQuestionClosed.VARIABLE_FUENTE,
            font: relationshipAutophrasesQuestionClosed.FUENTE
        }));

        await AutoPhraseService.getAutoPhrase(relationshipsTypes);
        await SourceQuestionRelationService.getQuestionData(relationshipsTypes);
        await OperativeFontService.getOperativeFontData(relationshipsTypes);

        return relationshipsTypes;
    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophrasesQuestionClosed = {
            ID_AUTOFRASE: trim(params.autophraseId),
            ID_FUENTE: trim(params.operativeFontId),
            ID_PREGUNTA: trim(params.questionId),
            ABREVIATURA: trim(params.abreviation),
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
            ABREVIATURA_VARIABLE: trim(params.abbreviation),
            VARIABLE_ESTADISTICA: trim(params.staticalVariable),
            ID_VARIABLE_FUENTE: trim(params.variableIdFont),
            PREGUNTA: trim(params.question),
            VARIABLE_FUENTE: trim(params.variableFont),
            FUENTE: trim(params.font)
        };
        const relationshipAutophrasesQuestionClosed = await relationshipAutophrasesQuestionClosedModel.
            insertOne(formattedRelationshipAutophrasesQuestionClosed);

        return {
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            operativeFontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
            questionId: relationshipAutophrasesQuestionClosed.ID_PREGUNTA,
            abreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA,
            observation: relationshipAutophrasesQuestionClosed.OBSERVACION,
            domain: relationshipAutophrasesQuestionClosed.DOMINIO,
            nomenclatorId: relationshipAutophrasesQuestionClosed.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesQuestionClosed.ID_NOMENCLATURA,
            approved: !!relationshipAutophrasesQuestionClosed.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_ALTA),
            userCreator: relationshipAutophrasesQuestionClosed.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesQuestionClosed.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA),
            staticalVariable: relationshipAutophrasesQuestionClosed.VARIABLE_ESTADISTICA,
            id: relationshipAutophrasesQuestionClosed.AUTOFRASE,
            nomenclature: relationshipAutophrasesQuestionClosed.NOMENCLATURA,
            variableId: relationshipAutophrasesQuestionClosed.ID_VARIABLE,
            abbreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA_VARIABLE,
            variableIdFont: relationshipAutophrasesQuestionClosed.ID_VARIABLE_FUENTE,
            question: relationshipAutophrasesQuestionClosed.PREGUNTA,
            variableFont: relationshipAutophrasesQuestionClosed.VARIABLE_FUENTE,
            font: relationshipAutophrasesQuestionClosed.FUENTE
        };
    }

    static async findOne(filters){
        const relationshipAutophrasesQuestionClosed = await relationshipAutophrasesQuestionClosedModel.findById(
            { ID_AUTOFRASE: filters.autophraseId, ID_NOMENCLADOR: filters.nomenclatorId,
                ID_NOMENCLATURA: filters.nomenclatureId });
        return {
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            operativeFontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
            questionId: relationshipAutophrasesQuestionClosed.ID_PREGUNTA,
            abreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA,
            observation: relationshipAutophrasesQuestionClosed.OBSERVACION,
            domain: relationshipAutophrasesQuestionClosed.DOMINIO,
            nomenclatorId: relationshipAutophrasesQuestionClosed.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesQuestionClosed.ID_NOMENCLATURA,
            approved: !!relationshipAutophrasesQuestionClosed.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_ALTA),
            userCreator: relationshipAutophrasesQuestionClosed.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesQuestionClosed.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA),
            staticalVariable: relationshipAutophrasesQuestionClosed.VARIABLE_ESTADISTICA,
            id: relationshipAutophrasesQuestionClosed.AUTOFRASE,
            nomenclature: relationshipAutophrasesQuestionClosed.NOMENCLATURA,
            variableId: relationshipAutophrasesQuestionClosed.ID_VARIABLE,
            abbreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA_VARIABLE,
            variableIdFont: relationshipAutophrasesQuestionClosed.ID_VARIABLE_FUENTE,
            question: relationshipAutophrasesQuestionClosed.PREGUNTA,
            variableFont: relationshipAutophrasesQuestionClosed.VARIABLE_FUENTE,
            font: relationshipAutophrasesQuestionClosed.FUENTE
        };
    }

    static async update(filters, params, userCreator){
        const formattedRelationshipAutophrasesQuestionClosed = {
            ID_AUTOFRASE: trim(params.autophraseId),
            ID_FUENTE: trim(params.operativeFontId),
            ID_PREGUNTA: trim(params.questionId),
            ABREVIATURA: trim(params.abreviation),
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
            ABREVIATURA_VARIABLE: trim(params.abbreviation),
            VARIABLE_ESTADISTICA: trim(params.staticalVariable),
            ID_VARIABLE_FUENTE: trim(params.variableIdFont),
            PREGUNTA: trim(params.question),
            VARIABLE_FUENTE: trim(params.variableFont),
            FUENTE: trim(params.font)
        };
        const relationshipAutophrasesQuestionClosed = await relationshipAutophrasesQuestionClosedModel.updateOne(
            {ID_AUTOFRASE: filters.id},
            formattedRelationshipAutophrasesQuestionClosed);
        return {
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            operativeFontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
            questionId: relationshipAutophrasesQuestionClosed.ID_PREGUNTA,
            abreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA,
            observation: relationshipAutophrasesQuestionClosed.OBSERVACION,
            domain: relationshipAutophrasesQuestionClosed.DOMINIO,
            nomenclatorId: relationshipAutophrasesQuestionClosed.ID_NOMENCLADOR,
            nomenclatureId: relationshipAutophrasesQuestionClosed.ID_NOMENCLATURA,
            approved: !!relationshipAutophrasesQuestionClosed.SUPERVISADO,
            createdAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_ALTA),
            userCreator: relationshipAutophrasesQuestionClosed.ID_USUARIO_ALTA,
            userDeleted: relationshipAutophrasesQuestionClosed.ID_USUARIO_BAJA,
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA),
            staticalVariable: relationshipAutophrasesQuestionClosed.VARIABLE_ESTADISTICA,
            id: relationshipAutophrasesQuestionClosed.AUTOFRASE,
            nomenclature: relationshipAutophrasesQuestionClosed.NOMENCLATURA,
            variableId: relationshipAutophrasesQuestionClosed.ID_VARIABLE,
            abbreviation: relationshipAutophrasesQuestionClosed.ABREVIATURA_VARIABLE,
            variableIdFont: relationshipAutophrasesQuestionClosed.ID_VARIABLE_FUENTE,
            question: relationshipAutophrasesQuestionClosed.PREGUNTA,
            variableFont: relationshipAutophrasesQuestionClosed.VARIABLE_FUENTE,
            font: relationshipAutophrasesQuestionClosed.FUENTE
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_AUTOFRASE: filters.autophraseId,
            ID_NOMENCLADOR: filters.nomenclatorId, ID_NOMENCLATURA: filters.nomenclatureId };
        const success = await relationshipAutophrasesQuestionClosedModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RelationshipAutophrasesQuestionClosedService;

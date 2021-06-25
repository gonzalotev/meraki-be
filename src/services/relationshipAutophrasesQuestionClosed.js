const { relationshipAutophrasesQuestionClosed: relationshipAutophrasesQuestionClosedModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class RelationshipAutophrasesQuestionClosedService {
    static async fetch() {
        const relationshipsTypes = await relationshipAutophrasesQuestionClosedModel.find({FECHA_BAJA: null});
        return relationshipsTypes.map(relationshipAutophrasesQuestionClosed => ({
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            fontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
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
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedRelationshipAutophrasesQuestionClosed = {
            ID_AUTOFRASE: trim(params.autophraseId),
            ID_FUENTE: trim(params.fontId),
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
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesQuestionClosed = await relationshipAutophrasesQuestionClosedModel.
            insertOne(formattedRelationshipAutophrasesQuestionClosed);

        return {
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            fontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
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
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const relationshipAutophrasesQuestionClosed = await relationshipAutophrasesQuestionClosedModel.findById(
            {ID_AUTOFRASE: filters.id});
        return {
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            fontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
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
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA)
        };
    }

    static async update(filters, params, userCreator){
        const formattedRelationshipAutophrasesQuestionClosed = {
            ID_AUTOFRASE: trim(params.autophraseId),
            ID_FUENTE: trim(params.fontId),
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
            FECHA_ALTA: new Date()
        };
        const relationshipAutophrasesQuestionClosed = await relationshipAutophrasesQuestionClosedModel.updateOne(
            {ID_AUTOFRASE: filters.id},
            formattedRelationshipAutophrasesQuestionClosed);
        return {
            autophraseId: relationshipAutophrasesQuestionClosed.ID_AUTOFRASE,
            fontId: relationshipAutophrasesQuestionClosed.ID_FUENTE,
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
            deletedAt: dateToString(relationshipAutophrasesQuestionClosed.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_AUTOFRASE: filters.id};
        const success = await relationshipAutophrasesQuestionClosedModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = RelationshipAutophrasesQuestionClosedService;

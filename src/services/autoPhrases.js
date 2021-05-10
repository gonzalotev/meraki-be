const { AutoPhrases } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class AutoPhrasesService {
    static async fetch(query) {
        const phrases = await AutoPhrases.findByPage(query.page, {FECHA_BAJA: null});
        return phrases.map(phrase => ({
            id: phrase.ID_AUTOFRASE,
            variableId: phrase.ID_VARIABLE,
            finalPhrase: phrase.FRASE_FINAL,
            approved: !!phrase.SUPERVISADO,
            observation: phrase.OBSERVACION,
            domain: phrase.DOMINIO,
            canRefeed: !!phrase.FRASE_RETROALIMENTADA_SI_NO,
            refeedDate: dateToString(phrase.FECHA_RETROALIMENTACION),
            parentId: phrase.ID_DEPENDE_ID_AUTOFRASE,
            userCreator: phrase.ID_USUARIO_ALTA,
            createdAt: dateToString(phrase.FECHA_ALTA),
            deletedAt: dateToString(phrase.FECHA_BAJA),
            userDeleted: phrase.ID_USUARIO_BAJA
        }));
    }
    static async find(filters){
        const phrase = await AutoPhrases.findById({ID_AUTOFRASE: filters.id});
        return {
            id: phrase.ID_AUTOFRASE,
            variableId: phrase.ID_VARIABLE,
            finalPhrase: phrase.FRASE_FINAL,
            approved: !!phrase.SUPERVISADO,
            observation: phrase.OBSERVACION,
            domain: phrase.DOMINIO,
            canRefeed: !!phrase.FRASE_RETROALIMENTADA_SI_NO,
            refeedDate: dateToString(phrase.FECHA_RETROALIMENTACION),
            parentId: phrase.ID_DEPENDE_ID_AUTOFRASE,
            userCreator: phrase.ID_USUARIO_ALTA,
            createdAt: dateToString(phrase.FECHA_ALTA),
            deletedAt: dateToString(phrase.FECHA_BAJA),
            userDeleted: phrase.ID_USUARIO_BAJA
        };
    }
    static async create(params, userCreator){
        const formattedAutoPhrases = {
            ID_AUTOFRASE: null,
            ID_VARIABLE: params.variableId,
            FRASE_FINAL: trim(params.finalPhrase),
            SUPERVISADO: params.approved,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            FRASE_RETROALIMENTADA_SI_NO: params.canRefeed,
            FECHA_RETROALIMENTACION: stringToDate(params.refeedDate),
            ID_DEPENDE_ID_AUTOFRASE: trim(params.parentId),
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date(),
            FECHA_BAJA: null,
            ID_USUARIO_BAJA: null
        };
        const phrase = await AutoPhrases.insertOne(formattedAutoPhrases);
        return {
            id: phrase.ID_AUTOFRASE,
            variableId: phrase.ID_VARIABLE,
            finalPhrase: phrase.FRASE_FINAL,
            approved: !!phrase.SUPERVISADO,
            observation: phrase.OBSERVACION,
            domain: phrase.DOMINIO,
            canRefeed: !!phrase.FRASE_RETROALIMENTADA_SI_NO,
            refeedDate: dateToString(phrase.FECHA_RETROALIMENTACION),
            parentId: phrase.ID_DEPENDE_ID_AUTOFRASE,
            userCreator: phrase.ID_USUARIO_ALTA,
            createdAt: dateToString(phrase.FECHA_ALTA),
            deletedAt: dateToString(phrase.FECHA_BAJA),
            userDeleted: phrase.ID_USUARIO_BAJA
        };
    }
    static async update(filters, params){
        const formattedAutoPhrases = {
            ID_VARIABLE: params.variableId,
            FRASE_FINAL: trim(params.finalPhrase),
            SUPERVISADO: params.approved,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            FRASE_RETROALIMENTADA_SI_NO: params.canRefeed,
            FECHA_RETROALIMENTACION: stringToDate(params.refeedDate),
            ID_DEPENDE_ID_AUTOFRASE: trim(params.parentId),
            ID_USUARIO_ALTA: params.userCreator,
            FECHA_ALTA: stringToDate(params.createdAt),
            FECHA_BAJA: stringToDate(params.deletedAt),
            ID_USUARIO_BAJA: params.userDeleted
        };
        const phrase = await AutoPhrases.updateOne({ID_AUTOFRASE: filters.id}, formattedAutoPhrases);
        return {
            id: phrase.ID_AUTOFRASE,
            variableId: phrase.ID_VARIABLE,
            finalPhrase: phrase.FRASE_FINAL,
            approved: !!phrase.SUPERVISADO,
            observation: phrase.OBSERVACION,
            domain: phrase.DOMINIO,
            canRefeed: !!phrase.FRASE_RETROALIMENTADA_SI_NO,
            refeedDate: dateToString(phrase.FECHA_RETROALIMENTACION),
            parentId: phrase.ID_DEPENDE_ID_AUTOFRASE,
            userCreator: phrase.ID_USUARIO_ALTA,
            createdAt: dateToString(phrase.FECHA_ALTA),
            deletedAt: dateToString(phrase.FECHA_BAJA),
            userDeleted: phrase.ID_USUARIO_BAJA
        };
    }
    static async delete(filters, userDeleted){
        const success = await AutoPhrases.deleteOne({ID_AUTOFRASE: filters.id}, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = AutoPhrasesService;

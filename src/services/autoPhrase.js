const { autoPhrase: autoPhraseModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class AutoPhraseService {
    static async fetch(query) {
        const autosPhrases = await autoPhraseModel.findByPage(
            query.page,
            { FECHA_BAJA: null },
            autoPhraseModel.selectableProps,
            [{ column: 'ID_AUTOFRASE', order: 'asc' }]
        );
        return autosPhrases.map(autoPhrase => ({
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            dateRetro: dateToString(autoPhrase.FECHA_RETROALIMENTACION),
            prhaseRetro: autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: null,
            ID_VARIABLE: trim(params.variableId),
            FRASE_FINAL: trim(params.finalPhrase),
            FECHA_RETROALIMENTACION: dateToString(params.dateRetro),
            FRASE_RETROALIMENTADA_SI_NO: params.prhaseRetro,
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const autoPhrase = await autoPhraseModel.insertOne(formattedAutoPhrase);

        return {
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            dateRetro: dateToString(autoPhrase.FECHA_RETROALIMENTACION),
            prhaseRetro: autoPhrase.FRASE_RETROALIMENTADA_SI_NO,
            domain: autoPhrase.DOMINIO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        };
    }

    static async findOne(filters) {
        const autoPhrase = await autoPhraseModel.findById({
            ID_AUTOFRASE: filters.id
        });
        return {
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        };
    }

    static async getTotal(filters) {
        const total = await autoPhraseModel.countDocuments(filters);
        return total['COUNT(*)'];
    }

    static async update(filters, params, userCreator) {
        const formattedAutoPhrase = {
            ID_AUTOFRASE: trim(params.id),
            ID_VARIABLE: trim(params.variableId),
            FRASE_FINAL: trim(params.finalPhrase),
            OBSERVACION: trim(params.observation),
            DOMINIO: trim(params.domain),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const autoPhrase = await autoPhraseModel.updateOne(
            { ID_AUTOFRASE: filters.id },
            formattedAutoPhrase
        );
        return {
            id: autoPhrase.ID_AUTOFRASE,
            variableId: autoPhrase.ID_VARIABLE,
            finalPhrase: autoPhrase.FRASE_FINAL,
            approved: autoPhrase.SUPERVISADO,
            observation: autoPhrase.OBSERVACION,
            domain: autoPhrase.DOMINIO,
            createdAt: dateToString(autoPhrase.FECHA_ALTA),
            userCreator: autoPhrase.ID_USUARIO_ALTA,
            userDeleted: autoPhrase.ID_USUARIO_BAJA,
            deletedAt: dateToString(autoPhrase.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted) {
        const formattedFilters = { ID_AUTOFRASE: filters.id };
        const success = await autoPhraseModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = AutoPhraseService;

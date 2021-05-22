const { autoPhrase: autoPhraseModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class AutoPhraseService {
    static async fetch() {
        const autosPhrases = await autoPhraseModel.find({FECHA_BAJA: null});
        return autosPhrases.map(autoPhrase => ({
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
        }));
    }

    static async create(params, userCreator) {
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
        const autoPhrase = await autoPhraseModel.insertOne(formattedAutoPhrase);

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

    static async findOne(filters){
        const autoPhrase = await autoPhraseModel.findById({ID_AUTOFRASE: filters.id});
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

    static async update(filters, params, userCreator){
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
        const autoPhrase = await autoPhraseModel.updateOne({ID_AUTOFRASE: filters.id},
            formattedAutoPhrase);
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

    static async delete(filters, userDeleted){
        const formattedFilters = {ID_AUTOFRASE: filters.id};
        const success = await autoPhraseModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = AutoPhraseService;

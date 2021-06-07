const { wordCorrector: wordCorrectorModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');

class WordCorrectorService {
    static async fetch(query) {
        const words = await wordCorrectorModel.findByPage(query.page, {FECHA_BAJA: null});
        return words.map(wordCorrector => ({
            wrong: wordCorrector.INCORRECTA,
            right: wordCorrector.CORRECTA,
            isAWord: !!wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: !!wordCorrector.SUPERVISADO,
            frequency: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator, transaction) {
        const formattedWordCorrector = {
            INCORRECTA: trim(params.wrong),
            CORRECTA: params.right,
            DESTINO_PALABRA_FRASE_SI_NO: params.isAWord,
            OBSERVACION: trim(params.observation),
            FRECUENCIA: params.frequency,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const wordCorrector = await wordCorrectorModel.insertOne(formattedWordCorrector, transaction);

        return {
            wrong: wordCorrector.INCORRECTA,
            right: wordCorrector.CORRECTA,
            isAWord: !!wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: !!wordCorrector.SUPERVISADO,
            frequency: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const wordCorrector = await wordCorrectorModel.findOne({INCORRECTA: filters.wrong, CORRECTA: filters.right});
        return {
            wrong: wordCorrector.INCORRECTA,
            right: wordCorrector.CORRECTA,
            isAWord: !!wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: !!wordCorrector.SUPERVISADO,
            frequency: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        };
    }

    static async update(filters, params){
        const formattedWordCorrector = {
            INCORRECTA: trim(params.wrong),
            CORRECTA: trim(params.right),
            DESTINO_PALABRA_FRASE_SI_NO: params.isAWord,
            OBSERVACION: trim(params.observation),
            FRECUENCIA: params.frequency,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: params.userCreator,
            ID_USUARIO_BAJA: params.userCreator,
            FECHA_BAJA: stringToDate(params.deletedAt),
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const wordCorrector = await wordCorrectorModel.updateOne(
            {INCORRECTA: filters.wrong, CORRECTA: filters.right},
            formattedWordCorrector
        );
        return {
            wrong: wordCorrector.INCORRECTA,
            right: wordCorrector.CORRECTA,
            isAWord: !!wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: !!wordCorrector.SUPERVISADO,
            frequency: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {INCORRECTA: filters.wrong, CORRECTA: filters.right};
        const success = await wordCorrectorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = WordCorrectorService;

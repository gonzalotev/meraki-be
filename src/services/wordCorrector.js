const { wordCorrector: wordCorrectorModel } = include('models');
const { dateToString } = include('util');
const trim = require('lodash/trim');

class WordCorrectorService {
    static async fetch(query) {
        const WordsCorrectors = await wordCorrectorModel.findByPage(query.page, {FECHA_BAJA: null});
        return WordsCorrectors.map(wordCorrector => ({
            incorrect: wordCorrector.INCORRECTA,
            correct: wordCorrector.CORRECTA,
            isAWord: wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: wordCorrector.SUPERVISADO,
            frequence: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        }));
    }

    static async create(params, userCreator) {
        const formattedWordCorrector = {
            INCORRECTA: trim(params.wrong),
            CORRECTA: trim(params.right),
            DESTINO_PALABRA_FRASE_SI_NO: trim(params.isAWord),
            OBSERVACION: trim(params.observation),
            FRECUENCIA: trim(params.frequency),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const wordCorrector = await wordCorrectorModel.insertOne(formattedWordCorrector);

        return {
            incorrect: wordCorrector.INCORRECTA,
            correct: wordCorrector.CORRECTA,
            isAWord: !!wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: !!wordCorrector.SUPERVISADO,
            frequence: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        };
    }

    static async findOne(filters){
        const wordCorrector = await wordCorrectorModel.findById({INCORRECTA: filters.incorrect});
        return {
            incorrect: wordCorrector.INCORRECTA,
            correct: wordCorrector.CORRECTA,
            isAWord: wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: wordCorrector.SUPERVISADO,
            frequence: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        };
    }

    static async update(filters, params, userCreator){
        const formattedWordCorrector = {
            INCORRECTA: trim(params.incorrect),
            CORRECTA: trim(params.description),
            DESTINO_PALABRA_FRASE_SI_NO: trim(params.isAWord),
            OBSERVACION: trim(params.observation),
            FRECUENCIA: trim(params.frequence),
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            ID_USUARIO_BAJA: null,
            FECHA_BAJA: null,
            FECHA_ALTA: new Date()
        };
        const wordCorrector = await wordCorrectorModel.updateOne({CORRECTA: filters.correct}, formattedWordCorrector);
        return {
            incorrect: wordCorrector.INCORRECTA,
            correct: wordCorrector.CORRECTA,
            isAWord: wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: wordCorrector.SUPERVISADO,
            frequence: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA,
            userDeleted: wordCorrector.ID_USUARIO_BAJA,
            deletedAt: dateToString(wordCorrector.FECHA_BAJA)
        };
    }

    static async delete(filters, userDeleted){
        const formattedFilters = {CORRECTA: filters.correct};
        const success = await wordCorrectorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }
}

module.exports = WordCorrectorService;

const { wordCorrector: wordCorrectorModel } = include('models');
const { dateToString, stringToDate } = include('util');
const trim = require('lodash/trim');
const map = require('lodash/map');
const { arrayToCsvFormat } = include('util');

class WordCorrectorService {
    static async fetch({ page, search }) {
        let words = [];
        if (page && search) {
            words = await wordCorrectorModel.fetchByPageAndTerm(page, search, { FECHA_BAJA: null });
        } else if (page) {
            words = await wordCorrectorModel.findByPage(page, { FECHA_BAJA: null });
        } else {
            words = await wordCorrectorModel.find({ FECHA_BAJA: null });
        }

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

    static async findOne(filters) {
        const wordCorrector = await wordCorrectorModel.findOne({ INCORRECTA: filters.wrong, CORRECTA: filters.right });
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

    static async update(filters, params) {
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
            { INCORRECTA: filters.wrong, CORRECTA: filters.right },
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

    static async delete(filters, userDeleted) {
        const formattedFilters = { INCORRECTA: filters.wrong, CORRECTA: filters.right };
        const success = await wordCorrectorModel.deleteOne(formattedFilters, {
            FECHA_BAJA: new Date(),
            ID_USUARIO_BAJA: userDeleted
        });
        return !!success;
    }

    static async getTotal({ search }) {
        const { total } = await wordCorrectorModel.countTotal({ FECHA_BAJA: null }, search, ['PALABRA']);
        return total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = wordCorrectorModel.knex.select(columns)
                .from(wordCorrectorModel.tableName)
                .where({ FECHA_BAJA: null })
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                worksheet.addRow(data);
            });
            stream.on('end', function () {
                resolve(worksheet);
            });
        });
    }

    static getColumns() {
        return [
            {
                original: 'INCORRECTA',
                modified: 'INCORRECTA'
            },
            {
                original: 'CORRECTA',
                modified: 'CORRECTA'
            },
            {
                original: 'DESTINO_PALABRA_FRASE_SI_NO',
                modified: 'DESTINO_PALABRA_FRASE_SI_NO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIóN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            },
            {
                original: 'FRECUENCIA',
                modified: 'FRECUENCIA'
            }
        ];
    }

    static getCsv() {
        return new Promise((resolve, reject) => {
            let csvString = '';
            const fieldNames = [

            ];
            const wordCorrectorTableHeaders = map(fieldNames, field => field.original);
            const wordCorrectorFileHeaders = map(fieldNames, field => field.modified);
            const headers = arrayToCsvFormat(wordCorrectorFileHeaders);
            csvString += headers;
            const stream = wordCorrectorModel.knex.select(wordCorrectorTableHeaders)
                .from(wordCorrectorModel.tableName)
                .orderBy([{ column: 'CORRECTA', order: 'asc' }])
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                csvString += arrayToCsvFormat(data);
            });
            stream.on('end', function () {
                resolve(csvString);
            });
        });
    }
}

module.exports = WordCorrectorService;

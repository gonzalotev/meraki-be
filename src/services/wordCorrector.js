const { wordCorrector: wordCorrectorModel } = include('models');
const { dateToString, stringToDate } = include('util');
const knex = include('helpers/database');
const trim = require('lodash/trim');
const map = require('lodash/map');
const isDate = require('lodash/isDate');
const { arrayToCsvFormat } = include('util');

class WordCorrectorService {
    static async fetch({ page, search }) {
        let words = [];
        if (page && search) {
            words = await knex.raw(`
                select *
                from corrector_de_palabras
                where correcta like ?
                OFFSET ? ROWS FETCH NEXT 20 ROWS ONLY
            `, [`${search}%`, (page-1) * 20]);
        } else if (page) {
            words = await wordCorrectorModel.findByPage(page);
        } else {
            words = await wordCorrectorModel.find();
        }

        return words.map(wordCorrector => ({
            wrong: wordCorrector.INCORRECTA,
            right: wordCorrector.CORRECTA,
            isAWord: !!wordCorrector.DESTINO_PALABRA_FRASE_SI_NO,
            observation: wordCorrector.OBSERVACION,
            approved: !!wordCorrector.SUPERVISADO,
            frequency: wordCorrector.FRECUENCIA,
            createdAt: dateToString(wordCorrector.FECHA_ALTA),
            userCreator: wordCorrector.ID_USUARIO_ALTA
        }));
    }

    static async create(params, userCreator) {
        const formattedWordCorrector = {
            INCORRECTA: trim(params.wrong),
            CORRECTA: params.right,
            DESTINO_PALABRA_FRASE_SI_NO: params.isAWord,
            OBSERVACION: trim(params.observation),
            FRECUENCIA: params.frequency,
            SUPERVISADO: params.approved,
            ID_USUARIO_ALTA: userCreator,
            FECHA_ALTA: new Date()
        };
        const wordCorrector = await wordCorrectorModel.insertOne(formattedWordCorrector, ['INCORRECTA', 'CORRECTA']);

        return WordCorrectorService.findOne({wrong: wordCorrector.INCORRECTA, right: wordCorrector.CORRECTA});
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
            userCreator: wordCorrector.ID_USUARIO_ALTA
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
            FECHA_ALTA: stringToDate(params.createdAt)
        };
        const wordCorrector = await wordCorrectorModel.updateOne(
            { INCORRECTA: filters.wrong, CORRECTA: filters.right },
            formattedWordCorrector,
            ['INCORRECTA', 'CORRECTA']
        );
        return WordCorrectorService.findOne({wrong: wordCorrector.INCORRECTA, right: wordCorrector.CORRECTA});
    }

    static async delete(filters) {
        const formattedFilters = { INCORRECTA: filters.wrong, CORRECTA: filters.right };
        const success = await wordCorrectorModel.delete(formattedFilters);
        return !!success;
    }

    static async getTotal({ search }) {
        const { total } = await wordCorrectorModel.countTotal({}, search);
        return total;
    }

    static exportToFile(worksheet, columns) {
        return new Promise((resolve, reject) => {
            const stream = wordCorrectorModel.knex.select(columns)
                .from(wordCorrectorModel.tableName)
                .where()
                .stream();
            stream.on('error', function (err) {
                reject(err);
            });
            stream.on('data', function (data) {
                const formattedData = map(data, function(value) {
                    if(isDate(value)) {
                        return dateToString(value);
                    }
                    return value;
                });
                worksheet.addRow(formattedData);
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
                modified: 'DESTINO PALABRA FRASE SI/NO'
            },
            {
                original: 'OBSERVACION',
                modified: 'OBSERVACIÓN'
            },
            {
                original: 'SUPERVISADO',
                modified: 'SUPERVISADO'
            },
            {
                original: 'FRECUENCIA',
                modified: 'FRECUENCÍA'
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

const { NewWordService, NewPhraseService, WordsDictionaryService, WordCorrectorService } = include('services');
const isEmpty = require('lodash/isEmpty');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const split = require('lodash/split');

class NewWordController {
    static async fetch(req, res, next) {
        try {
            const newsWords = await NewWordService.fetch();
            const uniqueOperativeVariable =
                await NewWordService.fetchOperativeVariables();
            res.send({ newsWords, uniqueOperativeVariable });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const newWord = await NewWordService.findOne(req.params);
            res.send({ newWord });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const { newWord, dictionary, corrector } = req.body;
            const response = {};
            const { frequency, abc, word } = newWord;
            if (dictionary) {
                const createdDictionary = await WordsDictionaryService.create(
                    { ...dictionary, frequency, abc, word },
                    req.user.id
                );
                response.dictionary = createdDictionary;
                response.newWord = newWord;
                res.status(201);
            } else if (corrector) {
                const createdCorrector = await WordCorrectorService.create(
                    { ...corrector, frequency, wrong: word },
                    req.user.id
                );
                response.corrector = createdCorrector;
                response.newWord = newWord;
                res.status(201);
            } else {
                const updatedNewWord = await NewWordService.updateOne({ ...newWord, corrected: false });
                response.newWord = updatedNewWord;
                res.status(200);
            }
            res.send(response);
        } catch (err) {
            const errorJson = err.message.match(/\{.+\}/);
            if (errorJson) {
                err.errors = JSON.parse(errorJson[0]);
                if(err.errors.notFoundWords) {
                    err.errors.notFoundWords = split(err.errors.notFoundWords, ' ');
                }
                if(err.errors.notFoundFamily) {
                    err.errors.notFoundFamily = split(err.errors.notFoundFamily, ' ');
                }
            }
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const newWord = await NewWordService.update(req.params, req.body);
            res.send({ newWord });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await NewWordService.delete(req.params, req.user.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async fetchStaticData(req, res, next) {
        try {
            const operatives = await NewWordService.fetchOperativeVariables();
            res.send({ operatives });
        } catch (error) {
            next(error);
        }
    }
    static async findFirst(req, res, next) {
        try {
            let phrases = [];
            const newWord = await NewWordService.findFirst(req.params);
            if (!isEmpty(newWord)) {
                phrases = await NewPhraseService.fetch({ word: newWord.word });
            }
            res.send({ newWord, phrases });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(NewWordService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Nuevas_Palabras');
            const sheetColums = map(
                NewWordService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NewWordService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Nuevas_Palabras.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Nuevas_Palabras', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NewWordController;

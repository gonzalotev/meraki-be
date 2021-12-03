const { WordsDictionaryService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class WordsDictionaryController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const words = await WordsDictionaryService.fetch({ page, search: searchValue });
            const total = await WordsDictionaryService.getTotal({ search: searchValue });
            res.send({ words, total });
        } catch (error) {
            next(error);
        }
    }

    static async findMatch(req, res, next) {
        try {
            const matchWords = await WordsDictionaryService.findMatching(req.params);
            res.send({ matchWords });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const word = await WordsDictionaryService.findOne(req.params);
            res.send({ word });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const word = await WordsDictionaryService.create(req.body, req.user.id);
            res.send({ success: true, word });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const word = await WordsDictionaryService.update(req.params, req.body);
            res.send({ success: true, word });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await WordsDictionaryService.delete(req.params, req.user.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(WordsDictionaryService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Diccionario_de_Palabras');
            const sheetColums = map(
                WordsDictionaryService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await WordsDictionaryService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Diccionario_De_Palabras.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = WordsDictionaryController;

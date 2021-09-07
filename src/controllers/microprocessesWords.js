const { MicroprocessesWordsService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class MicroprocessesWordsController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const microprocessesWordsss = await MicroprocessesWordsService.fetch(
                { page, search: searchValue });
            const total = await MicroprocessesWordsService.getTotal({ search: searchValue });
            res.send({ microprocessesWordsss, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesWord = await MicroprocessesWordsService.findOne(req.params);
            res.send({ microprocessesWord });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const microprocessesWord = await MicroprocessesWordsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessesWord, success: true });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const microprocessesWord = await MicroprocessesWordsService.update(req.params, req.body);
            res.send({ success: true, microprocessesWord });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await MicroprocessesWordsService.delete(req.params, req.user.id);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const microprocessesWord = await MicroprocessesWordsService.findById(req.params);
            res.send({ microprocessesWord });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const originalColumns = map(MicroprocessesWordsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('microprocesos_palabras');
            const sheetColums = map(
                MicroprocessesWordsService.getColumns(),
                column => ({key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await MicroprocessesWordsService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=microprocesos_palabras.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, {sheetName: 'microprocesos_palabras', formatterOptions: {delimiter: ';'}});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesWordsController;

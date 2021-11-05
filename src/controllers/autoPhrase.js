const { AutoPhraseService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const map = require('lodash/map');

class AutoPhraseController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const autosPhrases = await AutoPhraseService.fetch({ page, search: searchValue });
            const total = await AutoPhraseService.getTotal({ search: searchValue });
            res.send({ autosPhrases, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const autoPhrase = await AutoPhraseService.findOne(req.params);
            res.send({ autoPhrase });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const autoPhrase = await AutoPhraseService.create(req.body, req.user.id);
            res.status(201);
            res.send({ autoPhrase });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const autoPhrase = await AutoPhraseService.update(req.params, req.body);
            res.send({ autoPhrase });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await AutoPhraseService.delete(req.params, req.user.id);
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
            const originalColumns = map(AutoPhraseService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('autofrases');
            const sheetColums = map(
                AutoPhraseService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await AutoPhraseService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=autofrases.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'autofrases', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AutoPhraseController;

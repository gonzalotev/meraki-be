const { WordCorrectorService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class WordCorrectorController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const wordsCorrectors = await WordCorrectorService.fetch({ page, search: searchValue });
            const total = await WordCorrectorService.getTotal({ search: searchValue });
            res.send({ wordsCorrectors, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const wordCorrector = await WordCorrectorService.findOne(req.params);
            res.send({ wordCorrector });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const wordCorrector = await WordCorrectorService.create(req.body.corrector, req.user.id);
            res.status(201);
            res.send({ wordCorrector });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const {corrector, current} = req.body;
            const wordCorrector = await WordCorrectorService.update(current, corrector);
            res.send({ wordCorrector });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const {current} = req.body;
            const success = await WordCorrectorService.delete(current, req.user.id);
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
            const originalColumns = map(WordCorrectorService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Corrector_Palabra');
            const sheetColums = map(
                WordCorrectorService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await WordCorrectorService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Corrector_Palabra.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = WordCorrectorController;

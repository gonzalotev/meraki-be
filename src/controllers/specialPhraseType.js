const { SpecialPhraseTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class SpecialPhraseTypeController {
    static async fetch(req, res, next) {
        try {
            const specialsPhrasesTypes = await SpecialPhraseTypeService.fetch();
            res.send({ specialsPhrasesTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.findOne(req.params);
            res.send({ specialPhraseType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ specialPhraseType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.update(req.params, req.body);
            res.send({ specialPhraseType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await SpecialPhraseTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(SpecialPhraseTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Frases_Especiales');
            const sheetColums = map(
                SpecialPhraseTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await SpecialPhraseTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Frases_Especiales.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Frases_Especiales', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = SpecialPhraseTypeController;

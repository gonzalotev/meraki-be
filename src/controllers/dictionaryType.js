const { DictionaryTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class DictionaryTypeController {
    static async fetch(req, res, next) {
        try {
            const dictionarysTypes = await DictionaryTypeService.fetch();
            res.send({ dictionarysTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.findOne(req.params);
            res.send({ dictionaryType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ dictionaryType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.update(req.params, req.body);
            res.send({ dictionaryType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await DictionaryTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(DictionaryTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Diccionarios');
            const sheetColums = map(
                DictionaryTypeService.getColumns(),
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await DictionaryTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Diccionarios.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Diccionarios', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DictionaryTypeController;

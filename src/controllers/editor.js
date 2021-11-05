const { EditorService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class EditorController {
    static async fetch(req, res, next) {
        try {
            const editorsss = await EditorService.fetch();
            res.send({ editorsss });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const editor = await EditorService.findOne(req.params);
            res.send({ editor });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const editor = await EditorService.create(req.body, req.user.id);
            res.status(201);
            res.send({ editor });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const editor = await EditorService.update(req.params, req.body);
            res.send({ editor });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await EditorService.delete(req.params, req.user.id);
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
            const originalColumns = map(EditorService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Editores');
            const sheetColums = map(
                EditorService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await EditorService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Editores.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Editores', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = EditorController;

const { DocumentsService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class DocumentsController {
    static async fetch(req, res, next) {
        try {
            const documentss = await DocumentsService.fetch();
            res.send({ documentss });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const document = await DocumentsService.findOne(req.params);
            res.send({ document });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const document = await DocumentsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ document });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const document = await DocumentsService.update(req.params, req.body);
            res.send({ document });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await DocumentsService.delete(req.params, req.user.id);
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
            const originalColumns = map(DocumentsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Documentos');
            const sheetColums = map(
                DocumentsService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await DocumentsService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Documentos.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Documentos', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DocumentsController;

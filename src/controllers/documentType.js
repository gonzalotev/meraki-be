const { DocumentTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class DocumentTypeController {
    static async fetch(req, res, next) {
        try {
            const documentsTypes = await DocumentTypeService.fetch();
            res.send({ documentsTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const documentType = await DocumentTypeService.findOne(req.params);
            res.send({ documentType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const documentType = await DocumentTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ documentType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const documentType = await DocumentTypeService.update(req.params, req.body);
            res.send({ documentType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await DocumentTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(DocumentTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Documentos');
            const sheetColums = map(
                DocumentTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await DocumentTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Documentos.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Documentos', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DocumentTypeController;

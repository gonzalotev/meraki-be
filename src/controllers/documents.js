const { DocumentsService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class DocumentsController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const documentss = await DocumentsService.fetch({ page, search: searchValue });
            const total = await DocumentsService.getTotal({ search: searchValue });
            res.send({ documentss, total });
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
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Documentos.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DocumentsController;

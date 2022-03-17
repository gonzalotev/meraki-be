const { EditorService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class EditorController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const editorsss = await EditorService.fetch({ page, search: searchValue });
            const total = await EditorService.getTotal({ search: searchValue });
            res.send({ editorsss, total });
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
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Editores.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = EditorController;

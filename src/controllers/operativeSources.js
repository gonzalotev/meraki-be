const { OperativeSourcesService } = include('services');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class OperativeSourcesController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const operativesSources = await OperativeSourcesService.fetch({ page, search: searchValue });
            const total = await OperativeSourcesService.getTotal({ search: searchValue });
            res.send({ operativesSources, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const operativeSource = await OperativeSourcesService.findOne(req.params);
            res.send({ operativeSource });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const operativeSource = await OperativeSourcesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operativeSource });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const operativeSource = await OperativeSourcesService.update(req.params, req.body);
            res.send({ operativeSource });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await OperativeSourcesService.delete(req.params, req.user.id);
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
            const operativeSource = await OperativeSourcesService.findById(req.params);
            res.send({ operativeSource });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(OperativeSourcesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Fuentes_Operativos');
            const sheetColums = map(
                OperativeSourcesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await OperativeSourcesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Fuentes_Operativos.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OperativeSourcesController;

const { OperativesService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class OperativesController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const operatives = await OperativesService.fetch({ page, search: searchValue });
            const total = await OperativesService.getTotal({ search: searchValue });
            res.send({ operatives, total });
        } catch (error) {
            next(error);
        }
    }

    static async findMatch(req, res, next) {
        try {
            const matchWords = await OperativesService.findMatching(req.params);
            res.send({ matchWords });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const operative = await OperativesService.findOne(req.params);
            res.send({ operative });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const operative = await OperativesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operative });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const operative = await OperativesService.update(req.params, req.body);
            res.send({ operative });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await OperativesService.delete(req.params, req.user.id);
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
            const operative = await OperativesService.findById(req.params);
            res.send({ operative });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(OperativesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Operativos');
            const sheetColums = map(
                OperativesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await OperativesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Operativos.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = OperativesController;

const { OperativeStructureService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class OperativeStructureController {
    static async fetch(req, res, next) {
        try {
            const { page } = req.query;
            const operativesStructures = await OperativeStructureService.fetch({ page });
            const total = await OperativeStructureService.getTotal();
            res.send({ operativesStructures, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const operativeStructure = await OperativeStructureService.findOne(req.params);
            res.send({ operativeStructure });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const operativeStructure = await OperativeStructureService.create(req.body, req.user.id);
            res.status(201);
            res.send({ operativeStructure });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const operativeStructure = await OperativeStructureService.update(req.params, req.body);
            res.send({ operativeStructure });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await OperativeStructureService.delete(req.params, req.user.id);
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
            const originalColumns = map(OperativeStructureService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Estructura_Operativo');
            const sheetColums = map(
                OperativeStructureService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await OperativeStructureService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Estructura_Operativo.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OperativeStructureController;

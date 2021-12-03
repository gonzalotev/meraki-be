const { StaticalVariableService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class StaticalVariableController {
    static async fetch(req, res, next) {
        try {
            const staticalsVariables = await StaticalVariableService.fetch();
            res.send({ staticalsVariables });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const staticalVariable = await StaticalVariableService.findOne(req.params);
            res.send({ staticalVariable });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const staticalVariable = await StaticalVariableService.create(req.body, req.user.id);
            res.status(201);
            res.send({ staticalVariable });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const staticalVariable = await StaticalVariableService.update(req.params, req.body);
            res.send({ staticalVariable });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await StaticalVariableService.delete(req.params, req.user.id);
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
            const originalColumns = map(StaticalVariableService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Variables_Estadisticas');
            const sheetColums = map(
                StaticalVariableService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await StaticalVariableService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Variables_Estadisticas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = StaticalVariableController;

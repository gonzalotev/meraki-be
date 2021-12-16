const { RunEncodingProcessesService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class RunEncodingProcessesController {
    static async fetch(req, res, next) {
        try {
            const encodingProcesses = await RunEncodingProcessesService.fetch();
            res.send({ encodingProcesses });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const encodingProcess = await RunEncodingProcessesService.findOne(req.params);
            res.send({ encodingProcess });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const encodingProcess = await RunEncodingProcessesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ encodingProcess });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const encodingProcess = await RunEncodingProcessesService.update(req.params, req.body);
            res.send({ success: true, encodingProcess });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await RunEncodingProcessesService.delete(req.params, req.user.id);
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
            const encodingProcess = await RunEncodingProcessesService.findById(req.params);
            res.send({ encodingProcess });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(RunEncodingProcessesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Correr_Procesos_Codificacion');
            const sheetColums = map(
                RunEncodingProcessesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RunEncodingProcessesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Correr_Procesos_Codificacion.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RunEncodingProcessesController;
const { StepsEncodingProcessesService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class StepsEncodingProcessesController {
    static async fetch(req, res, next) {
        try {
            const encodingProcesses = await StepsEncodingProcessesService.fetch();
            res.send({ encodingProcesses });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const stepEncodingProcess = await StepsEncodingProcessesService.findOne(req.params);
            res.send({ stepEncodingProcess });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const stepEncodingProcess = await StepsEncodingProcessesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ stepEncodingProcess });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const stepEncodingProcess = await StepsEncodingProcessesService.update(req.params, req.body);
            res.send({ success: true, stepEncodingProcess });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await StepsEncodingProcessesService.delete(req.params);
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
            const stepEncodingProcess = await StepsEncodingProcessesService.findById(req.params);
            res.send({ stepEncodingProcess });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(StepsEncodingProcessesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Pasos_Procesos_Codificacion');
            const sheetColums = map(
                StepsEncodingProcessesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await StepsEncodingProcessesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Pasos_Procesos_Codificacion.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = StepsEncodingProcessesController;

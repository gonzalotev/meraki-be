const { StepsLinguisticProcessesService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class StepsLinguisticProcessesController {
    static async fetch(req, res, next) {
        try {
            const linguisticProcesses = await StepsLinguisticProcessesService.fetch();
            res.send({ linguisticProcesses });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const linguisticProcess = await StepsLinguisticProcessesService.findOne(req.params);
            res.send({ linguisticProcess });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const linguisticProcess = await StepsLinguisticProcessesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ linguisticProcess });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const linguisticProcess = await StepsLinguisticProcessesService.update(req.params, req.body);
            res.send({ success: true, linguisticProcess });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await StepsLinguisticProcessesService.delete(req.params, req.user.id);
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
            const linguisticProcess = await StepsLinguisticProcessesService.findById(req.params);
            res.send({ linguisticProcess });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(StepsLinguisticProcessesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Pasos_Procesos_Linguisticos');
            const sheetColums = map(
                StepsLinguisticProcessesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await StepsLinguisticProcessesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Pasos_Procesos_Linguisticos.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = StepsLinguisticProcessesController;

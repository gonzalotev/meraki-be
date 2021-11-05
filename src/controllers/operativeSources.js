const { OperativeSourcesService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
class OperativeSourcesController {
    static async fetch(req, res, next) {
        try {
            const operativesSources = await OperativeSourcesService.fetch();
            res.send({ operativesSources });
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
            res.send({ success: true, operativeSource });
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
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Fuentes_Operativos.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Fuentes_Operativos', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OperativeSourcesController;

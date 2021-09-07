const { OperativeLotService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class OperativeLotController {
    static async fetch(req, res, next) {
        try {
            const lots = await OperativeLotService.fetch();
            res.send({ lots });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const sperativeLot = await OperativeLotService.findOne(req.params);
            res.send({ sperativeLot });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const sperativeLot = await OperativeLotService.create(req.body, req.user.id);
            res.status(201);
            res.send({ sperativeLot });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const sperativeLot = await OperativeLotService.update(req.params, req.body);
            res.send({ sperativeLot });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await OperativeLotService.delete(req.params, req.user.id);
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
            const originalColumns = map(OperativeLotService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Lotes_Operativos');
            const sheetColums = map(
                OperativeLotService.getColumns(),
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await OperativeLotService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Lotes_Operativos.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Lotes_Operativos', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OperativeLotController;

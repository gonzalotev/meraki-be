const { MicroprocessesListIfService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class MicroprocessesListIfController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const microprocessesListIf = await MicroprocessesListIfService.fetch({page});
            const total = await MicroprocessesListIfService.getTotal();
            res.send({ microprocessesListIf, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesListIf = await MicroprocessesListIfService.findOne(req.params);
            res.send({ microprocessesListIf });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessesListIf = await MicroprocessesListIfService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessesListIf });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const microprocessesListIf = await MicroprocessesListIfService.update(req.params, req.body, req.user.id);
            res.send({microprocessesListIf});
        } catch(err){
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const originalColumns = map(MicroprocessesListIfService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('microprocesos_listas_if');
            const sheetColums = map(
                MicroprocessesListIfService.getColumns(),
                column => ({key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await MicroprocessesListIfService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=microprocesos_listas_if.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, {sheetName: 'microprocesos_listas_if', formatterOptions: {delimiter: ';'}});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesListIfController;

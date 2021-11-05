const { MicroprocessesClosedQuestionIfService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class MicroprocessesClosedQuestionIfController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            // eslint-disable-next-line max-len
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.fetch({page});
            const total = await MicroprocessesClosedQuestionIfService.getTotal();
            res.send({ microprocessesClosedQuestionIf, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.findOne(req.params);
            res.send({ microprocessesClosedQuestionIf });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            // eslint-disable-next-line max-len
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.create(req.body, req.user);
            res.status(201);
            res.send({ microprocessesClosedQuestionIf });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            // eslint-disable-next-line max-len
            const microprocessesClosedQuestionIf = await MicroprocessesClosedQuestionIfService.update(req.params, req.body, req.user.id);
            res.send({microprocessesClosedQuestionIf});
        } catch(err){
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const originalColumns = map(MicroprocessesClosedQuestionIfService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('micro_preg_cerr_if');
            const sheetColums = map(
                MicroprocessesClosedQuestionIfService.getColumns(),
                column => ({key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await MicroprocessesClosedQuestionIfService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=micro_preg_cerr_if.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, {sheetName: 'micro_preg_cerr_if', formatterOptions: {delimiter: ';'}});
        } catch(err) {
            next(err);
        }
    }
    static async delete(req, res, next){
        try {
            const success = await MicroprocessesClosedQuestionIfService.delete(req.params);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesClosedQuestionIfController;

const {MicroprocessStepsService} = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const { decodeQuery } = include('util');

class MicroprocessStepsController {
    static async fetchSteps(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            console.log(query);
            const microprocessSteps = await MicroprocessStepsService.fetch(query);
            const total = await MicroprocessStepsService.getTotal(query);
            res.send({ microprocessSteps, total });
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessStep = await MicroprocessStepsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessStep });
        } catch(err) {
            const errorJson = err.message.match(/\{.+\}/);
            if (errorJson) {
                err.errors = JSON.parse(errorJson[0]);
            }
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocessStep = await MicroprocessStepsService.update(req.params, req.body);
            res.send({microprocessStep});
        } catch(err){
            next(err);
        }
    }

    static async find(req, res, next) {
        try{
            const microprocessStep = await MicroprocessStepsService.findOne(req.params);
            res.send({microprocessStep});
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessStepsService.delete(req.params);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const originalColumns = map(MicroprocessStepsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('microprocesos_pasos');
            const sheetColums = map(
                MicroprocessStepsService.getColumns(),
                column => ({key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await MicroprocessStepsService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=microprocesos_pasos.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, {sheetName: 'microprocesos_pasos', formatterOptions: {delimiter: ';'}});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessStepsController;

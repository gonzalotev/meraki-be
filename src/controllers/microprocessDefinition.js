const { MicroprocessDefinitionService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const isEmpty = require('lodash/isEmpty');

class MicroprocessDefinitionController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const microprocesses = await MicroprocessDefinitionService.fetch({page});
            const total = await MicroprocessDefinitionService.getTotal();
            res.send({ microprocesses, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try{
            const microprocess = await MicroprocessDefinitionService.findOne(req.params);
            res.send({microprocess});
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const foundMicroprocess= await MicroprocessDefinitionService.findOne({id: req.body.id});
            if (!isEmpty(foundMicroprocess)) {
                throw Error('Ya existe ese ID MICROPROCESO para una Definición de Microproceso. Por favor verifíquelo.');
            }
            const microprocess = await MicroprocessDefinitionService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocess });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocess = await MicroprocessDefinitionService.update(req.params, req.body);
            res.send({microprocess});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessDefinitionService.delete(req.params);
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
            const originalColumns = map(MicroprocessDefinitionService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('microprocesos');
            const sheetColums = map(
                MicroprocessDefinitionService.getColumns(),
                column => ({key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await MicroprocessDefinitionService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=microprocesos.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, {sheetName: 'microprocesos', formatterOptions: {delimiter: ';'}});
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessDefinitionController;

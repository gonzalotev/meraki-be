const { EncodingProcessesService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class EncodingProcessesController {
    static async fetch(req, res, next) {
        try {
            const encodingProcesses = await EncodingProcessesService.fetch();
            res.send({ encodingProcesses });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const encodingProcess = await EncodingProcessesService.findOne(req.params);
            res.send({ encodingProcess });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const encodingProcess = await EncodingProcessesService.create(req.body, req.user.id);
            res.send({ success: true, encodingProcess });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const encodingProcess = await EncodingProcessesService.update(req.params, req.body);
            res.send({success: true, encodingProcess});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await EncodingProcessesService.delete(req.params, req.user.id);
            res.send({success});
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(EncodingProcessesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Procesos_de_Codificacion');
            const sheetColums = map(
                EncodingProcessesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await EncodingProcessesService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Procesos_de_Codificacion.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Procesos_de_Codificacion', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = EncodingProcessesController;

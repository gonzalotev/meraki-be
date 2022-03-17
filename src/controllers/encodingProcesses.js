const { EncodingProcessesService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class EncodingProcessesController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const encodingProcesses = await EncodingProcessesService.fetch({ page, search: searchValue });
            const total = await EncodingProcessesService.getTotal({ search: searchValue });
            res.send({ encodingProcesses, total });
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
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Proceso_de_codificacion.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = EncodingProcessesController;

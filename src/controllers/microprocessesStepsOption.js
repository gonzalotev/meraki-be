const { MicroprocessesStepsOptionService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class MicroprocessesStepsOptionController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const microprocesses = await MicroprocessesStepsOptionService.fetch({ page, search: searchValue });
            const total = await MicroprocessesStepsOptionService.getTotal({ search: searchValue });
            res.send({ microprocesses, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try {
            const microprocessStepOption = await MicroprocessesStepsOptionService.findOne(req.params);
            res.send({microprocessStepOption});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            const microprocessStepOption = await MicroprocessesStepsOptionService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessStepOption });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const microprocessStepOption = await MicroprocessesStepsOptionService.update(req.params, req.body);
            res.send({ success: true, microprocessStepOption });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await MicroprocessesStepsOptionService.delete(req.params, req.user.id);
            if(result){
                res.sendStatus(204);
            }else{
                res.sendStatus(400);
            }
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const microprocessStepOption = await MicroprocessesStepsOptionService.findById(req.params);
            res.send({ microprocessStepOption });
        } catch(error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const originalColumns = map(MicroprocessesStepsOptionService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('microprocesos_pasos_opcion');
            const sheetColums = map(
                MicroprocessesStepsOptionService.getColumns(),
                column => ({key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await MicroprocessesStepsOptionService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Microprocesos_Pasos_Opcion.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesStepsOptionController;

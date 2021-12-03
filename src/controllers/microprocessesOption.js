const { MicroprocessesOptionService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class MicroprocessesOptionController {
    static async fetch(req, res, next) {
        try {
            const {page} = req.query;
            const microprocessesOption = await MicroprocessesOptionService.fetch({page});
            const total = await MicroprocessesOptionService.getTotal();
            res.send({ microprocessesOption, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesOption = await MicroprocessesOptionService.findOne(req.params);
            res.send({ microprocessesOption });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const microprocessesOption = await MicroprocessesOptionService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessesOption });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const microprocessesOption = await MicroprocessesOptionService.update(req.params, req.body, req.user.id);
            res.send({microprocessesOption});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await MicroprocessesOptionService.delete(req.params, req.user.id);
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
            const originalColumns = map(MicroprocessesOptionService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('microprocesos_opcion');
            const sheetColums = map(
                MicroprocessesOptionService.getColumns(),
                column => ({key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await MicroprocessesOptionService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Microprocesos_Opcion.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesOptionController;

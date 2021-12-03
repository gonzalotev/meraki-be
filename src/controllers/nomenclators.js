const {NomenclatorsService} = include('services');
const {Nomenclators} = include('models');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class NomenclatorsController {
    static async fetch(req, res, next) {
        try {
            const nomenclators = await Nomenclators.find();
            res.send({ nomenclators });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try{
            const nomenclator = await Nomenclators.insertOne(req.body);
            res.send({ success: true, nomenclator });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const nomenclator = await Nomenclators.updateOne(req.params, req.body);
            res.send({ success: true, nomenclator });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const result = await Nomenclators.deleteOne(req.params);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next){
        try{
            const nomenclator = await Nomenclators.findById(req.params);
            res.send({ nomenclator });
        } catch(error) {
            next(error);
        }
    }

    static async fetchStaticNomenclators(req, res, next){
        try{
            const nomenclators = await NomenclatorsService.fetchStaticNomenclators();
            res.send({nomenclators});
        } catch(err){
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(NomenclatorsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Clasificadores');
            const sheetColums = map(
                NomenclatorsService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NomenclatorsService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Clasificadores.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NomenclatorsController;

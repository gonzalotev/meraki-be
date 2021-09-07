const {NomenclatorsService} = include('services');
const {Nomenclators} = include('models');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
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
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await NomenclatorsService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Clasificadores.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Clasificadores', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NomenclatorsController;

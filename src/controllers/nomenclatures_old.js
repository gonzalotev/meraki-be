const { NomenclaturesService } = include('services');
const { Nomenclatures } = include('models');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class NomenclaturesController {
    static async fetch(req, res, next) {
        try {
            const nomenclatures = await Nomenclatures.find();
            res.send({ nomenclatures });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const nomenclature = await Nomenclatures.insertOne(req.body);
            res.send({ success: true, nomenclature });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const nomenclature = await Nomenclatures.updateOne(req.params, req.body);
            res.send({ success: true, nomenclature });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await Nomenclatures.deleteOne(req.params);
            res.send({ success: result });
        } catch (error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const nomenclature = await Nomenclatures.findById(req.params);
            res.send({ nomenclature });
        } catch (error) {
            next(error);
        }
    }

    static async fetchStaticNomenclatures(req, res, next) {
        try {
            const nomenclatures = await NomenclaturesService.fetchStaticNomenclatures();
            res.send({ nomenclatures });
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(NomenclaturesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Nomenclaturas');
            const sheetColums = map(
                NomenclaturesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NomenclaturesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Nomenclaturas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NomenclaturesController;

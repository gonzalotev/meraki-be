const { NomenclatorTypesService } = include('services');
const { NomenclatorTypes } = include('models');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class NomenclatorTypesController {
    static async fetch(req, res, next) {
        try {
            const nomenclatorType = await NomenclatorTypes.findAll();
            res.send({ nomenclatorType });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const nomenclatorType = await NomenclatorTypesService.findOne(req.params);
            res.send({ nomenclatorType });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const nomenclatorType = await NomenclatorTypesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ nomenclatorType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const nomenclatorType = await NomenclatorTypesService.update(req.params, req.body);
            res.send({ success: true, nomenclatorType });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await NomenclatorTypesService.delete(req.params.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const nomenclatorType = await NomenclatorTypes.findById(req.params);
            res.send({ nomenclatorType });
        } catch (error) {
            next(error);
        }
    }

    static async fetchStaticNomenclatorTypes(req, res, next) {
        try {
            const nomenclators = await NomenclatorTypesService.fetchStaticNomenclatorTypes();
            res.send({ nomenclators });
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(NomenclatorTypesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Clasificadores');
            const sheetColums = map(
                NomenclatorTypesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NomenclatorTypesService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Clasificadores.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NomenclatorTypesController;

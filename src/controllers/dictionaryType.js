const { DictionaryTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class DictionaryTypeController {
    static async fetch(req, res, next) {
        try {
            const dictionarysTypes = await DictionaryTypeService.fetch(req.query);
            res.send({ dictionarysTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.findOne(req.params);
            res.send({ dictionaryType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ dictionaryType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.update(req.params, req.body);
            res.send({ dictionaryType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await DictionaryTypeService.delete(req.params.id);
            if (success) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(DictionaryTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Diccionarios');
            const sheetColums = map(
                DictionaryTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await DictionaryTypeService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Diccionarios.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DictionaryTypeController;

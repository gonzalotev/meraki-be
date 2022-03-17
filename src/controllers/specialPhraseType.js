const { SpecialPhraseTypeService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class SpecialPhraseTypeController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const specialsPhrasesTypes = await SpecialPhraseTypeService.fetch({ page, search: searchValue });
            const total = await SpecialPhraseTypeService.getTotal({ search: searchValue });
            res.send({ specialsPhrasesTypes, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.findOne(req.params);
            res.send({ specialPhraseType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ specialPhraseType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const specialPhraseType = await SpecialPhraseTypeService.update(req.params, req.body);
            res.send({ specialPhraseType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await SpecialPhraseTypeService.delete(req.params.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(SpecialPhraseTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Frases_Especiales');
            const sheetColums = map(
                SpecialPhraseTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await SpecialPhraseTypeService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Frases_Especiales.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = SpecialPhraseTypeController;

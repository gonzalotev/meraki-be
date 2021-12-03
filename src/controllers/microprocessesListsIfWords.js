const { MicroprocessesListsIfWordsService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class MicroprocessesListsIfWordsController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const microprocessesListsIfWordsss = await MicroprocessesListsIfWordsService.fetch(
                { page, search: searchValue });
            const total = await MicroprocessesListsIfWordsService.getTotal({ search: searchValue });
            res.send({ microprocessesListsIfWordsss, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.findOne(req.params);
            res.send({ microprocessesListsIfWord });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ microprocessesListsIfWord, success: true });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.update(req.params, req.body);
            res.send({ success: true, microprocessesListsIfWord });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await MicroprocessesListsIfWordsService.delete(req.params, req.user.id);
            if (result) {
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
            const microprocessesListsIfWord = await MicroprocessesListsIfWordsService.findById(req.params);
            res.send({ microprocessesListsIfWord });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const originalColumns = map(MicroprocessesListsIfWordsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('micro_lista_if_pala');
            const sheetColums = map(
                MicroprocessesListsIfWordsService.getColumns(),
                column => ({key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await MicroprocessesListsIfWordsService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Microprocesos_Listas_Si_No_Palabras.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MicroprocessesListsIfWordsController;

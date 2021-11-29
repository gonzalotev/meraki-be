const { NomenclaturesService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const map = require('lodash/map');

class NomenclaturesController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const total = await NomenclaturesService.getTotal({ search: searchValue });
            const nomenclaturess = await NomenclaturesService.fetch({ page, search: searchValue });
            res.send({ nomenclaturess, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const nomenclature = await NomenclaturesService.findOne(req.params);
            res.send({ nomenclature });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const nomenclature = await NomenclaturesService.create(req.body, req.user.id);
            res.status(201);
            res.send({ nomenclature });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const nomenclature = await NomenclaturesService.update(req.params, req.body);
            res.send({ nomenclature });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await NomenclaturesService.delete(req.params, req.user.id);
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
            const originalColumns = map(NomenclaturesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Nomenclaturas');
            const sheetColums = map(
                NomenclaturesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NomenclaturesService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Nomenclaturas.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Nomenclaturas', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NomenclaturesController;

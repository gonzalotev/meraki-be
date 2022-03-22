const { RelationshipBetweenNomenclatorsService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class RelationshipBetweenNomenclatorsController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const relationships = await RelationshipBetweenNomenclatorsService.fetch({ page, search: searchValue });
            const total = await RelationshipBetweenNomenclatorsService.getTotal({ search: searchValue });
            res.send({ relationships, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationship = await RelationshipBetweenNomenclatorsService.findOne(req.params);
            res.send({ relationship });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationship = await RelationshipBetweenNomenclatorsService.create(req.body, req.user.id);
            res.send({ success: true, relationship });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationship = await RelationshipBetweenNomenclatorsService.update(req.params, req.body);
            res.send({ success: true, relationship });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipBetweenNomenclatorsService.delete(req.params, req.user.id);
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
            const originalColumns = map(RelationshipBetweenNomenclatorsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Entre_Nomencladores');
            const sheetColums = map(
                RelationshipBetweenNomenclatorsService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipBetweenNomenclatorsService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Relacion_entre_Clasificadores.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipBetweenNomenclatorsController;

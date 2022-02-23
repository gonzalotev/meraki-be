const { NetworkTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class NetworkTypeController {
    static async fetch(req, res, next) {
        try {
            const networksTypes = await NetworkTypeService.fetch();
            res.send({ networksTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const networkType = await NetworkTypeService.findOne(req.params);
            res.send({ networkType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const networkType = await NetworkTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ networkType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const networkType = await NetworkTypeService.update(req.params, req.body);
            res.send({ networkType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await NetworkTypeService.delete(req.params.id);
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
            const originalColumns = map(NetworkTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Redes');
            const sheetColums = map(
                NetworkTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NetworkTypeService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Redes.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NetworkTypeController;

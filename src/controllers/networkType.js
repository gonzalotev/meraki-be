const { NetworkTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

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
            const success = await NetworkTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(NetworkTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Redes');
            const sheetColums = map(
                NetworkTypeService.getColumns(),
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await NetworkTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Redes.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Redes', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NetworkTypeController;

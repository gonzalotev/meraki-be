const { OrganizationTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class OrganizationTypeController {
    static async fetch(req, res, next) {
        try {
            const organizationsTypes = await OrganizationTypeService.fetch();
            res.send({ organizationsTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const organizationType = await OrganizationTypeService.findOne(req.params);
            res.send({ organizationType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const organizationType = await OrganizationTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ organizationType });
        } catch (err) {
            const errorJson = err.message.match(/\{.+\}/);
            if (errorJson) {
                err.errors = JSON.parse(errorJson[0]);
            }
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const organizationType = await OrganizationTypeService.update(req.params, req.body);
            res.send({ organizationType });
        } catch (err) {
            const errorJson = err.message.match(/\{.+\}/);
            if (errorJson) {
                err.errors = JSON.parse(errorJson[0]);
            }
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await OrganizationTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(OrganizationTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Organizacion');
            const sheetColums = map(
                OrganizationTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await OrganizationTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Organizacion.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Organizacion', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = OrganizationTypeController;

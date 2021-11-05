const { RolesTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class RolesTypeController {
    static async fetch(req, res, next) {
        try {
            const rolessTypes = await RolesTypeService.fetch();
            res.send({ rolessTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const rolesType = await RolesTypeService.findOne(req.params);
            res.send({ rolesType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const rolesType = await RolesTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ rolesType });
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
            const rolesType = await RolesTypeService.update(req.params, req.body);
            res.send({ rolesType });
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
            const success = await RolesTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(RolesTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Roles');
            const sheetColums = map(
                RolesTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RolesTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Roles.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Roles', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RolesTypeController;

const { AssignmentRolesOperativeVariableService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const { decodeQuery } = include('util');
const tempy = require('tempy');

class AssignmentRolesOperativeVariableController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const assigments = await AssignmentRolesOperativeVariableService.fetch(query);
            const total = await AssignmentRolesOperativeVariableService.getTotal(query);
            res.send({ assigments, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const ids = JSON.parse(decodeURIComponent(req.params.ids));
            const assigment = await AssignmentRolesOperativeVariableService.findOne(ids);
            res.send({ assigment });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const assigment = await AssignmentRolesOperativeVariableService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ assigment });
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
            const ids = JSON.parse(decodeURIComponent(req.params.ids));
            const assigment = await AssignmentRolesOperativeVariableService.update(ids, req.body);
            res.send({ assigment });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const ids = JSON.parse(decodeURIComponent(req.params.ids));
            const success = await AssignmentRolesOperativeVariableService.delete(ids, req.user.id);
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
            const originalColumns = map(AssignmentRolesOperativeVariableService.getColumns(),
                column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Roles_Operativos_Variables');
            const sheetColums = map(
                AssignmentRolesOperativeVariableService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await AssignmentRolesOperativeVariableService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Roles_Operativos_Variables.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AssignmentRolesOperativeVariableController;

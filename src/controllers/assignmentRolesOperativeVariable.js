const { AssignmentRolesOperativeVariableService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class AssignmentRolesOperativeVariableController {
    static async fetch(req, res, next) {
        try {
            const assignmentsRolesOperativeVariables = await AssignmentRolesOperativeVariableService.fetch(req.query);
            const total = await AssignmentRolesOperativeVariableService.getTotal({});
            res.send({ assignmentsRolesOperativeVariables, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const assignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableService.findOne(req.params);
            res.send({ assignmentRolesOperativeVariable });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const assignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ assignmentRolesOperativeVariable });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const assignmentRolesOperativeVariable = await AssignmentRolesOperativeVariableService.
                update(req.params, req.body);
            res.send({ assignmentRolesOperativeVariable });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await AssignmentRolesOperativeVariableService.delete(req.params, req.user.id);
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
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Roles_Operativos_Variables.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Roles_Operativos_Variables', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AssignmentRolesOperativeVariableController;

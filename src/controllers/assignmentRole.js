const { AssignmentRoleService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class AssignmentRoleController {
    static async fetch(req, res, next) {
        try {
            const token = req.get('Authorization');
            const { page } = req.query;
            const assignmentsRoles = await AssignmentRoleService.fetch({ page, token });
            const total = await AssignmentRoleService.getTotal();
            res.send({ assignmentsRoles, total });
        } catch (error) {
            next(error);
        }
    }

    static async fetchDisabled(req, res, next) {
        try {
            const token = req.get('Authorization');
            const { page } = req.query;
            const assignmentsDisabledRoles = await AssignmentRoleService.fetchDisabled({ page, token });
            const total = await AssignmentRoleService.getTotal();
            res.send({ assignmentsDisabledRoles, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const { roleId, userId } = req.params;
            const assignmentRole = await AssignmentRoleService.findOne({ roleId, userId });
            res.send({ assignmentRole });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const assignmentRoleFound = await AssignmentRoleService.findOne(req.body);
            if (assignmentRoleFound) {
                const { roleId, userId } = req.body;
                const assignmentRole = await AssignmentRoleService.update(
                    { roleId, userId },
                    {...req.body, createdAt: new Date, deletedAt: null}
                );
                res.status(201);
                res.send({ assignmentRole });
            } else {
                const assignmentRole = await AssignmentRoleService.create(req.body);
                res.status(201);
                res.send({ assignmentRole });
            }
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { roleId, userId } = req.params;
            const assignmentRole = await AssignmentRoleService.update({ roleId, userId }, req.body);
            res.send({ assignmentRole });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { roleId, userId } = req.params;
            const success = await AssignmentRoleService.delete({ roleId, userId });
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
            const originalColumns = map(AssignmentRoleService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('roles_asignados');
            const sheetColums = map(
                AssignmentRoleService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await AssignmentRoleService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Roles.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }

    static async getRoles(req, res, next) {
        try {
            const { userId, assigned, notAssigned } = req.query;
            const roles = await AssignmentRoleService.fetchRoles({ userId, assigned, notAssigned });
            res.send({ ...roles });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AssignmentRoleController;

const { RelationshipTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class RelationshipTypeController {
    static async fetch(req, res, next) {
        try {
            const relationshipsTypes = await RelationshipTypeService.fetch();
            res.send({ relationshipsTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.findOne(req.params);
            res.send({ relationshipType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.update(req.params, req.body);
            res.send({ relationshipType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipTypeService.delete(req.params, req.user.id);
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
            const originalColumns = map(RelationshipTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Relaciones');
            const sheetColums = map(
                RelationshipTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipTypeService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Tipos_Relaciones.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Tipos_Relaciones', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipTypeController;

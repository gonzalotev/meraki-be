const { RelationshipAutophrasesNomenclatureService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class RelationshipAutophrasesNomenclatureController {
    static async fetch(req, res, next) {
        try {
            const relationshipsTypes = await RelationshipAutophrasesNomenclatureService.fetch();
            res.send({ relationshipsTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.
                findOne(req.params);
            res.send({ relationshipAutophrasesNomenclature });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophrasesNomenclature });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.
                update(req.params, req.body);
            res.send({ relationshipAutophrasesNomenclature });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipAutophrasesNomenclatureService.delete(req.params, req.user.id);
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
            const originalColumns = map(RelationshipAutophrasesNomenclatureService.getColumns(),
                column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Autofrases_Nomenclaturas');
            const sheetColums = map(
                RelationshipAutophrasesNomenclatureService.getColumns(),
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await RelationshipAutophrasesNomenclatureService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Relacion_Autofrases_Nomenclaturas.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Relacion_Autofrases_Nomenclaturas', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipAutophrasesNomenclatureController;

const { NomenclatorSubtypesService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class NomenclatorSubtypeController {
    static async fetch(req, res, next) {
        try {
            const nomenclators = await NomenclatorSubtypesService.fetch();
            res.send({ nomenclators });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const nomeclator = await NomenclatorSubtypesService.findOne(req.params);
            res.send({ nomeclator });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const nomeclator = await NomenclatorSubtypesService.create(req.body, req.user.id);
            res.send({ success: true, nomeclator });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const nomeclator = await NomenclatorSubtypesService.update(req.params, req.body);
            res.send({ success: true, nomeclator });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await NomenclatorSubtypesService.delete(req.params, req.user.id);
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
            const originalColumns = map(NomenclatorSubtypesService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Subtipo_Clasificador');
            const sheetColums = map(
                NomenclatorSubtypesService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await NomenclatorSubtypesService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Subtipo_Clasificador.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Subtipo_Clasificador', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = NomenclatorSubtypeController;

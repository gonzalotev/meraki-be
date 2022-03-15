const { RelationshipQuestionClosedsNomenclatureService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const map = require('lodash/map');
const tempy = require('tempy');

class RelationshipQuestionClosedsNomenclatureController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const relationshipsTypes = await RelationshipQuestionClosedsNomenclatureService.fetch(
                { page, search: searchValue });
            const total = await RelationshipQuestionClosedsNomenclatureService.getTotal({ search: searchValue });
            res.send({ relationshipsTypes, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipQuestionClosedsNomenclature = await RelationshipQuestionClosedsNomenclatureService.
                findOne(req.params);
            res.send({ relationshipQuestionClosedsNomenclature });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipQuestionClosedsNomenclature = await RelationshipQuestionClosedsNomenclatureService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipQuestionClosedsNomenclature });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipQuestionClosedsNomenclature = await RelationshipQuestionClosedsNomenclatureService.
                update(req.params, req.body);
            res.send({ relationshipQuestionClosedsNomenclature });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipQuestionClosedsNomenclatureService.delete(req.params, req.user.id);
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
            const originalColumns = map(RelationshipQuestionClosedsNomenclatureService.getColumns(),
                column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Preguntas_Cerradas_Nomenclaturas');
            const sheetColums = map(
                RelationshipQuestionClosedsNomenclatureService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipQuestionClosedsNomenclatureService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Relacion_Preguntas_Cerradas_Nomenclaturas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });;
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipQuestionClosedsNomenclatureController;

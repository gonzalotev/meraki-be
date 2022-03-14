const { RelationshipQuestionClosedsLettersService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class RelationshipQuestionClosedsLetterController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const relationshipsLetter = await RelationshipQuestionClosedsLettersService.fetch(
                { page, search: searchValue });
            const total = await RelationshipQuestionClosedsLettersService.getTotal({ search: searchValue });
            res.send({ relationshipsLetter, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipQuestionClosedsLetter = await RelationshipQuestionClosedsLettersService.
                findOne(req.params);
            res.send({ relationshipQuestionClosedsLetter });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipQuestionClosedsLetter = await RelationshipQuestionClosedsLettersService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipQuestionClosedsLetter });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipQuestionClosedsLetter = await RelationshipQuestionClosedsLettersService.
                update(req.params, req.body);
            res.send({ relationshipQuestionClosedsLetter });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipQuestionClosedsLettersService.delete(req.params, req.user.id);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const relationshipQuestionClosedsLetter =
             await RelationshipQuestionClosedsLettersService.findById(req.params);
            res.send({ relationshipQuestionClosedsLetter });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns =
             map(RelationshipQuestionClosedsLettersService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Autofrases_Letras');
            const sheetColums = map(
                RelationshipQuestionClosedsLettersService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipQuestionClosedsLettersService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Relacion_Preguntas_Cerradas_Letras.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipQuestionClosedsLetterController;

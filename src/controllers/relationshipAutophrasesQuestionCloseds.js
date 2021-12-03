const { RelationshipAutophrasesQuestionClosedsService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class RelationshipAutophrasesQuestionClosedsController {
    static async fetch(req, res, next) {
        try {
            const relationshipAutophrasesQuestionCloseds = await RelationshipAutophrasesQuestionClosedsService
                .fetch(req.query);
            const total = await RelationshipAutophrasesQuestionClosedsService.getTotal({ source: req.query.source });
            res.send({ relationshipAutophrasesQuestionCloseds, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipAutophraseQuestionClosed = await RelationshipAutophrasesQuestionClosedsService
                .findOne(req.params);
            res.send({ relationshipAutophraseQuestionClosed });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipAutophraseQuestionClosed = await RelationshipAutophrasesQuestionClosedsService
                .create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophraseQuestionClosed });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipAutophraseQuestionClosed = await RelationshipAutophrasesQuestionClosedsService
                .update(req.params, req.body);
            res.send({ relationshipAutophraseQuestionClosed });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipAutophrasesQuestionClosedsService.delete(req.params, req.user.id);
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
            const originalColumns = map(RelationshipAutophrasesQuestionClosedsService.getColumns(),
                column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Autofrases_Preguntas_Cerradas');
            const sheetColums = map(
                RelationshipAutophrasesQuestionClosedsService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipAutophrasesQuestionClosedsService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Relacion_Autofrases_Preguntas_Cerradas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipAutophrasesQuestionClosedsController;

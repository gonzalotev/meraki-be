const { RelationshipAutophrasesLettersService } = include('services');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class RelationshipAutophrasesLetterController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const relationshipsLetter = await RelationshipAutophrasesLettersService.fetch(
                { page, search: searchValue });
            const total = await RelationshipAutophrasesLettersService.getTotal({ search: searchValue });
            res.send({ relationshipsLetter, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.
                findOne(req.params);
            res.send({ relationshipAutophrasesLetter });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophrasesLetter });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.
                update(req.params, req.body);
            res.send({ relationshipAutophrasesLetter });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipAutophrasesLettersService.delete(req.params, req.user.id);
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
            const relationshipAutophrasesLetter = await RelationshipAutophrasesLettersService.findById(req.params);
            res.send({ relationshipAutophrasesLetter });
        } catch (error) {
            next(error);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(RelationshipAutophrasesLettersService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Autofrases_Letras');
            const sheetColums = map(
                RelationshipAutophrasesLettersService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipAutophrasesLettersService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Relacion_Autofrases_Letras.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipAutophrasesLetterController;

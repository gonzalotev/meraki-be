const { ClosedQuestionsService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const map = require('lodash/map');
const tempy = require('tempy');

class ClosedQuestionsController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const closedQuestions = await ClosedQuestionsService.fetch({ page, search: searchValue });
            const total = await ClosedQuestionsService.getTotal({ search: searchValue });
            res.send({ closedQuestions, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const closedQuestion = await ClosedQuestionsService.findOne(req.params);
            res.send({ closedQuestion });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const closedQuestion = await ClosedQuestionsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ closedQuestion });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const closedQuestion = await ClosedQuestionsService.update(req.params, req.body);
            res.send({ closedQuestion });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await ClosedQuestionsService.delete(req.params, req.user.id);
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
            const originalColumns = map(ClosedQuestionsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('preguntasCerradas');
            const sheetColums = map(
                ClosedQuestionsService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await ClosedQuestionsService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=PreguntasCerradas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ClosedQuestionsController;

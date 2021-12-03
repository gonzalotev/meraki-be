const { QuestionTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class QuestionTypeController {
    static async fetch(req, res, next) {
        try {
            const questionsTypes = await QuestionTypeService.fetch();
            res.send({ questionsTypes });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const questionType = await QuestionTypeService.findOne(req.params);
            res.send({ questionType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const questionType = await QuestionTypeService.create(req.body, req.user.id);
            res.send({ success: true, questionType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const questionType = await QuestionTypeService.update(req.params, req.body);
            res.send({ success: true, questionType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await QuestionTypeService.delete(req.params, req.user.id);
            res.send({ success });
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(QuestionTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Preguntas');
            const sheetColums = map(
                QuestionTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await QuestionTypeService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Preguntas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = QuestionTypeController;

const { QuestionsService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class QuestionsController {
    static async fetch(req, res, next) {
        try {
            const questions = await QuestionsService.fetch();
            res.send({ questions });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const question = await QuestionsService.findOne(req.params);
            res.send({ question });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const question = await QuestionsService.create(req.body, req.user.id);
            res.send({ success: true, question });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            const question = await QuestionsService.update(req.params, req.body);
            res.send({success: true, question});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await QuestionsService.delete(req.params);
            if (success) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(QuestionsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Preguntas');
            const sheetColums = map(
                QuestionsService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await QuestionsService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Preguntas.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = QuestionsController;

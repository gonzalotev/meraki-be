const { QuestionsService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

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
            const success = await QuestionsService.delete(req.params, req.user.id);
            res.send({success});
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
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await QuestionsService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Preguntas.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Preguntas', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = QuestionsController;

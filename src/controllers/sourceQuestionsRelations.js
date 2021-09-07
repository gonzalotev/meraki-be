const { SourceQuestionsRelationsService, OperativeSourcesService, QuestionsService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const { sourceQuestionRelation } = include('models');

class SourceQuestionsRelationsController {
    static async fetch(req, res, next) {
        try {
            const sourceQuestionsRelations = await SourceQuestionsRelationsService.fetch(req.query);
            const total = await SourceQuestionsRelationsService.getTotal({ source: req.query.source });
            res.send({ sourceQuestionsRelations, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const sourceQuestionRelation = await SourceQuestionsRelationsService.findOne(req.params);
            res.send({ sourceQuestionRelation });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const sourceQuestionRelation = await SourceQuestionsRelationsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ sourceQuestionRelation });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const sourceQuestionRelation = await SourceQuestionsRelationsService.update(req.params, req.body);
            res.send({ sourceQuestionRelation });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await SourceQuestionsRelationsService.delete(req.params, req.user.id);
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
            const originalColumns = map(SourceQuestionsRelationsService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Relacion_Fuente_Pregunta');
            const sheetColums = map(
                SourceQuestionsRelationsService.getColumns(),
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await SourceQuestionsRelationsService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Relacion_Fuente_Pregunta.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Relacion_Fuente_Pregunta', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }

    static async getOptions(req, res, next) {
        try {
            const { questions, sourceId } = req.query;
            const data = {};
            data.sources = await OperativeSourcesService.fetchIfExist(sourceQuestionRelation, 'ID_FUENTE', { FECHA_BAJA: null });
            if (questions) {
                if (sourceId) {
                    data.questions = await QuestionsService.fetchIfExist(sourceQuestionRelation, 'ID_PREGUNTA', { ID_FUENTE: sourceId, FECHA_BAJA: null });
                } else {
                    data.questions = await QuestionsService.fetchIfExist(sourceQuestionRelation, 'ID_PREGUNTA', { FECHA_BAJA: null });
                }
            }
            res.send(data);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = SourceQuestionsRelationsController;

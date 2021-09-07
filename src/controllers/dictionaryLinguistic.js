const { DictionaryLinguisticService, StaticalVariableService, DictionaryTypeService } = include('services');
const toUpper = require('lodash/toUpper');
const ExcelJS = require('exceljs');
const map = require('lodash/map');

class DictionaryLinguisticController {
    static async fetch(req, res, next) {
        try {
            const { page, search } = req.query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            let dictionaries = await DictionaryLinguisticService.fetch({ page, search: searchValue });
            dictionaries = await DictionaryTypeService.includeDictionariesTypes(dictionaries);
            dictionaries = await StaticalVariableService.includeVariables(dictionaries);
            const total = await DictionaryLinguisticService.getTotal({ search: searchValue });
            res.send({ dictionaryLinguistics: dictionaries, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const { originalDescription, dictionaryTypeId, variableId } = req.params;
            const id = {
                originalDescription: decodeURIComponent(originalDescription),
                dictionaryTypeId,
                variableId
            };
            const dictionaryLinguistic = await DictionaryLinguisticService.findOne(id);
            res.send({ dictionaryLinguistic });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const dictionaryLinguistic = await DictionaryLinguisticService.create(req.body, req.user.id);
            res.status(201);
            res.send({ dictionaryLinguistic });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { originalDescription, dictionaryTypeId, variableId, dictionary } = req.body;
            const id = { originalDescription, dictionaryTypeId, variableId };
            const dictionaryLinguistic = await DictionaryLinguisticService.update(id, dictionary);
            res.send({ dictionaryLinguistic });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { originalDescription, dictionaryTypeId, variableId } = req.params;
            const id = {
                originalDescription: decodeURIComponent(originalDescription),
                dictionaryTypeId,
                variableId
            };
            const success = await DictionaryLinguisticService.delete(id, req.user.id);
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
            const originalColumns = map(DictionaryLinguisticService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Diccionario_Linguistico');
            const sheetColums = map(
                DictionaryLinguisticService.getColumns(),
                column => ({ key: column.original, header: column.original })
            );
            worksheet.columns = sheetColums;
            await DictionaryLinguisticService.exportToFile(worksheet, originalColumns);
            res.header('Content-type', 'text/csv; charset=utf-8');
            res.header('Content-disposition', 'attachment; filename=Diccionario_Linguistico.csv');
            res.write(Buffer.from('EFBBBF', 'hex'));
            await workbook.csv.write(res, { sheetName: 'Diccionario_Linguistico', formatterOptions: { delimiter: ';' } });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = DictionaryLinguisticController;

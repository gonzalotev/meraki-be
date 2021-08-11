const {DynamicQueryExecutor, ExcelFileManager} = include('util');
const {errorMessages} = include('enums');
const isEmpty = require('lodash/isEmpty');

class ExcelGenerateService {
    static async downloadExcel(sheetName, tableName, filters) {
        const dataFromTable = await DynamicQueryExecutor.findAll(tableName, filters);
        if (isEmpty(dataFromTable.data)){
            throw new Error(errorMessages.INVALID_PERIOD);
        }
        return ExcelFileManager.generateExcelFile(sheetName, dataFromTable.columns, dataFromTable.data);
    }
}

module.exports = ExcelGenerateService;

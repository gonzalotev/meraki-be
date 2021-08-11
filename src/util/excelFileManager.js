const Excel = require('exceljs');
const {errorMessages} = include('enums');
const isEmpty = require('lodash/isEmpty');
const map = require('lodash/map');

class ExcelFileManager {

    /**
    * @function generateColumns
    * @description Generate excel columns based on the columns array passed
    * @returns [{header, key, width},...]
    */
    static generateColumns(columns) {
        return map(columns, column => ({header: column, key: column, width: 10}));
    }

    /**
     * @function generateExcelFile
     * @description generates an excel according to FileName (file name),
     *              rowsColumn (name of the columns) and rows (data)
     * @returns exceljs
     */
    static async generateExcelFile(sheetName, rowsColumn, rows, columns) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);
        worksheet.columns = await columns || this.generateColumns(rowsColumn);
        worksheet.addRows(rows);

        return workbook;
    }

    /**
     * @function getDataExcel
     * @description get columns and data from excel provided
     */
    static async getDataExcel(data) {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(data);
        const worksheet = workbook.worksheets[0];
        if(!worksheet) {
            throw new Error(errorMessages.EMPTY_EXCEL);
        }
        const columnsExcel = JSON.parse(JSON.stringify(worksheet.getRow(1).values));
        columnsExcel.splice(0, 1);
        const dataExcel = [];
        for (let i = 2; i <= worksheet.rowCount; i++) {
            const rowExcel = JSON.parse(JSON.stringify(worksheet.getRow(i).values));
            rowExcel.splice(0, 1);
            const objectRowExcel = {};
            if (!isEmpty(rowExcel)) {
                columnsExcel.forEach((key, index) =>
                    objectRowExcel[key] = (!rowExcel[index]) ? null : rowExcel[index]);
                dataExcel.push(objectRowExcel);
            }
        }
        return {columnsExcel, dataExcel};
    }
}

module.exports = ExcelFileManager;

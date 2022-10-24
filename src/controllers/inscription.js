const {InscriptionService} = include('services');
const {excelColumns} = include('constants');
const ExcelJS = require('exceljs');

class InscriptionController {
    static async fetch(req, res, next) {
        try {
            const inscriptions = await InscriptionService.fetch();
            res.send({success: true, inscriptions});
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            await InscriptionService.deleteOne(req.params.id);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }

    static async create(req, res, next){
        try{
            const inscription = await InscriptionService.create(req.body);
            res.send({inscription, success: true});
        }catch(error){
            next(error);
        }
    }

    static async downloadExcel(req, res, next){
        try {
            const data = await InscriptionService.fetch();
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Inscripciones');
            worksheet.columns = excelColumns.inscriptions;
            worksheet.addRows(data);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'Atributos.xlsx');
            await workbook.xlsx.write(res);
            res.end();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = InscriptionController;

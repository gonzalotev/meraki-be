const { RelationshipTypeService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class RelationshipTypeController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const relationshipsTypes = await RelationshipTypeService.fetch({ page, search: searchValue });
            const total = await RelationshipTypeService.getTotal({ search: searchValue });
            res.send({ relationshipsTypes, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.findOne(req.params);
            res.send({ relationshipType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const relationshipType = await RelationshipTypeService.update(req.params, req.body);
            res.send({ relationshipType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await RelationshipTypeService.delete(req.params.id);
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
            const originalColumns = map(RelationshipTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Relaciones');
            const sheetColums = map(
                RelationshipTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await RelationshipTypeService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Relaciones.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = RelationshipTypeController;

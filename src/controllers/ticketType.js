const { TicketTypeService } = include('services');
const ExcelJS = require('exceljs');
const map = require('lodash/map');
const tempy = require('tempy');

class TicketTypeController {
    static async fetch(req, res, next) {
        try {
            const ticketsTypes = await TicketTypeService.fetch(req.query);
            const total = await TicketTypeService.getTotal({});
            res.send({ ticketsTypes, total });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const ticketType = await TicketTypeService.findOne(req.params);
            res.send({ ticketType });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const ticketType = await TicketTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ ticketType });
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const ticketType = await TicketTypeService.update(req.params, req.body);
            res.send({ ticketType });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await TicketTypeService.delete(req.params.id);
            if (success) {
                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        } catch (err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next) {
        try {
            const originalColumns = map(TicketTypeService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Tipos_Ticket');
            const sheetColums = map(
                TicketTypeService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await TicketTypeService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Tipos_Ticket.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TicketTypeController;

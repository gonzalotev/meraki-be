const { TicketService } = include('services');
const ExcelJS = require('exceljs');
const toUpper = require('lodash/toUpper');
const {decodeQuery} = include('util');
const map = require('lodash/map');
const tempy = require('tempy');

class TicketController {
    static async fetch(req, res, next) {
        try {
            const query = decodeQuery(req.query);
            const { page, search } = query;
            const searchValue = search ? toUpper(decodeURIComponent(search)) : '';
            const tickets = await TicketService.fetch({ page, search: searchValue });
            const total = await TicketService.getTotal({ search: searchValue });
            res.send({ tickets, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const ticket = await TicketService.findOne(req.params);
            res.send({ ticket });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const ticket = await TicketService.create(req.body, req.user);
            res.status(201);
            res.send({ ticket });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const ticket = await TicketService.update(req.params, req.body);
            res.send({ticket});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const success = await TicketService.delete(req.params, req.user.id);
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
            const originalColumns = map(TicketService.getColumns(), column => column.original);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Ticket');
            const sheetColums = map(
                TicketService.getColumns(),
                column => ({ key: column.original, header: column.modified })
            );
            worksheet.columns = sheetColums;
            await TicketService.exportToFile(worksheet, originalColumns);
            const temp = tempy.file({extension: '.xlsx'});
            res.header('Content-type', 'text/xlsx; charset=utf-8');
            /* eslint-disable */ 
            res.header('Content-disposition', 'attachment; filename=Ticket.xlsx');
            await workbook.xlsx.writeFile(temp).then(function() {
                res.download(temp);
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TicketController;

const { TicketTypeService } = include('services');

class TicketTypeController {
    static async fetch(req, res, next) {
        try {
            const ticketsTypes = await TicketTypeService.fetch(req.query);
            const total = await TicketTypeService.getTotal({});
            res.send({ ticketsTypes, total });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const ticketType = await TicketTypeService.findOne(req.params);
            res.send({ ticketType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const ticketType = await TicketTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ ticketType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const ticketType = await TicketTypeService.update(req.params, req.body);
            res.send({ticketType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await TicketTypeService.delete(req.params, req.user.id);
            if(success){
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch(err) {
            next(err);
        }
    }

    static async downloadCsv(req, res, next){
        try {
            const stream = await TicketTypeService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = TicketTypeController;

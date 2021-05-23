const { TicketTypeService } = include('services');

class TicketTypeController {
    static async fetch(req, res, next) {
        try {
            const ticketsTypes = await TicketTypeService.fetch();
            res.send({ ticketsTypes });
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
}

module.exports = TicketTypeController;

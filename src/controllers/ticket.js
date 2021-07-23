const { TicketService } = include('services');

class TicketController {
    static async fetch(req, res, next) {
        try {
            const tickets = await TicketService.fetch(req.query, req.user.id);
            const total = await TicketService.getTotal({});
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
            const ticket = await TicketService.update(req.params, req.body, req.user.id);
            res.send({ticket});
        } catch(err){
            next(err);
        }
    }
}

module.exports = TicketController;

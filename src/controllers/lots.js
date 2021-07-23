const { LotsService } = include('services');

class LotsController {
    static async fetch(req, res, next) {
        try {
            const lotss = await LotsService.fetch();
            res.send({ lotss });
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const lot = await LotsService.findOne(req.params);
            res.send({ lot });
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        try {
            const lot = await LotsService.create(req.body, req.user.id);
            res.status(201);
            res.send({ lot });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const lot = await LotsService.update(req.params, req.body);
            res.send({ success: true, lot });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await LotsService.delete(req.params, req.user.id);
            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            next(error);
        }
    }

    static async fetchOne(req, res, next) {
        try {
            const { id } = req.params;
            const lot = await LotsService.findOne({ lotId: id });
            res.send({ lot });
        } catch (error) {
            next(error);
        }
    }
    static async fetchStaticLots(req, res, next) {
        try {
            const lots = await LotsService.fetchStaticLots();
            res.send({ lots });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = LotsController;

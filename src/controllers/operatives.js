const { OperativesService } = include('services');

class OperativesController {
    static async fetch(req, res, next){
        try {
            const operatives = await OperativesService.find();
            res.send({ operatives });
        } catch(err) {
            next(err);
        }
    }

    /*static async fetchOne(req, res, next){
        try {
            res.send({operatives: await Operatives.findById(req.params)});
        } catch(err) {
            next(err);
        }
    }

    static async create(req, res, next){
        try {
            await Operatives.startTransaction();
            const operative = head(await Operatives.insertOne(req.body));
            await Operatives.commitTransaction();
            res.send({success: true, operative});
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try{
            await Operatives.startTransaction();
            const operative = await Operatives.updateOne(req.query, req.body);
            await Operatives.commitTransaction();
            res.send({success: true, operative});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            await Operatives.startTransaction();
            await Operatives.deletedOne(req.query);
            await Operatives.commitTransaction();
            res.send({success: true});
        } catch(err) {
            next(err);
        }
    }*/
}

module.exports = OperativesController;

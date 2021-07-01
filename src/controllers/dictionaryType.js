const { DictionaryTypeService } = include('services');

class DictionaryTypeController {
    static async fetch(req, res, next) {
        try {
            const dictionarysTypes = await DictionaryTypeService.fetch();
            res.send({ dictionarysTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const dictionaryType = await DictionaryTypeService.findOne(req.params);
            res.send({ dictionaryType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const dictionaryType = await DictionaryTypeService.create(req.body, req.user.id);
            res.status(201);
            res.send({ dictionaryType });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const dictionaryType = await DictionaryTypeService.update(req.params, req.body);
            res.send({dictionaryType});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await DictionaryTypeService.delete(req.params, req.user.id);
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
            const stream = await DictionaryTypeService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = DictionaryTypeController;

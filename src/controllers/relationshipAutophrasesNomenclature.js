const { RelationshipAutophrasesNomenclatureService } = include('services');

class RelationshipAutophrasesNomenclatureController {
    static async fetch(req, res, next) {
        try {
            const relationshipsTypes = await RelationshipAutophrasesNomenclatureService.fetch();
            res.send({ relationshipsTypes });
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            console.log(req.params);
            const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.
                findOne(req.params);
            res.send({ relationshipAutophrasesNomenclature });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.
                create(req.body, req.user.id);
            res.status(201);
            res.send({ relationshipAutophrasesNomenclature });
        } catch(err) {
            next(err);
        }
    }

    static async update(req, res, next){
        try {
            const relationshipAutophrasesNomenclature = await RelationshipAutophrasesNomenclatureService.
                update(req.params, req.body);
            res.send({relationshipAutophrasesNomenclature});
        } catch(err){
            next(err);
        }
    }

    static async delete(req, res, next){
        try {
            const success = await RelationshipAutophrasesNomenclatureService.delete(req.params, req.user.id);
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
            const stream = await RelationshipAutophrasesNomenclatureService.getCsv();
            const buf = Buffer.from(stream, 'utf-8');
            res.send(buf);
        } catch(err) {
            next(err);
        }
    }
}

module.exports = RelationshipAutophrasesNomenclatureController;

const { classifierTypes } = include('models');
const { ClassifierTypesService } = include('services');

class ClassifierTypesController {
    static async fetch(req, res, next) {
        try {
            const data = {};
            const {classifierTypes} = req.query;
            if(classifierTypes) {
                const classifierTypes = await ClassifierTypesService.fetch();
                assign(data, {classifierTypes});
            }
            res.send(data);
        } catch(error) {
            next(error);
        }
    }

    static async find(req, res, next){
        try{
            const classifierType = await classifierTypes.findById(req.params);
            res.send({ classifierType });
        } catch(error) {
            next(error);
        }
    }

    static async create(req, res, next){
        try {
            const userCreator = req.user.id;
            const classifierType = await ClassifierTypesService.create(req.body, userCreator);
            res.send({ success: true, classifierType });
        } catch(error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            const classifierType = await classifierTypes.updateOne(req.params, req.body);
            res.send({ classifierType });
        } catch(error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            const userDestroyer = req.user.id;
            const result = await classifierTypes.deleteOne(req.params, userDestroyer);
            res.send({ success: result});
        } catch(error) {
            next(error);
        }
    }
}

module.exports = ClassifierTypesController;

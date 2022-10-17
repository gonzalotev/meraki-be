const {TimetableService} = include('services');

class TimetableController {
    static async fetch(req, res, next) {
        try {
            const timetables = await TimetableService.fetch();
            res.send({success: true, timetables});
        } catch (error) {
            next(error);
        }
    }

    static async find(req, res, next) {
        try {
            const timetable = await TimetableService.findOne(req.params.id);
            res.send({timetable});
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next){
        try{
            await TimetableService.deleteOne(req.params.id);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }

    static async create(req, res, next){
        try{
            const timetable = await TimetableService.create(req.body);
            res.send({timetable, success: true});
        }catch(error){
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            await TimetableService.update(req.params.id, req.body);
            res.send({ success: true});
        }catch(error){
            next(error);
        }
    }
}

module.exports = TimetableController;

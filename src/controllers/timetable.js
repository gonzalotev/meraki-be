const {TimetableService} = include('services');

class TimetableController {
    static async fetch(req, res, next) {
        try {
            const timetable = await TimetableService.fetch();
            res.send(timetable);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = TimetableController;

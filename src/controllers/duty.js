const {DutyService} = include('services');

class DutyController {
    static async fetch(req, res, next) {
        try {
            const duty = await DutyService.fetch();
            res.send(duty);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = DutyController;

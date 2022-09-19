const {DutyService} = include('services');

class DutyController {
    static async fetch(req, res, next) {
        try {
            const duties = await DutyService.fetch();
            res.send({success: true, duties});
        } catch (error) {
            next(error);
        }
    }

}

module.exports = DutyController;

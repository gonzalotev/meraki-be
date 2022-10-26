const {EnrollmentService} = include('services');

class EnrollmentController {
    static async fetch(req, res, next) {
        try {
            const enrollment = await EnrollmentService.fetch();
            res.send(enrollment);
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next){
        try{
            await EnrollmentService.update(req.body);
            res.send({success: true});
        }catch(error){
            next(error);
        }
    }
}

module.exports = EnrollmentController;

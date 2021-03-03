const {MonitoringService} = include('services');
const {roles} = include('enums');

class MonitoringController {
    static async getMonitoring(req, res, next) {
        try {
            let state;
            if ([roles.SUB_COORDINATOR, roles.COORDINATOR].includes(req.user.roles[0])) {
                state = req.user.attributes.stateId;
            }
            res.send(
                await MonitoringService.getMonitoring(state ? {...req.body, state} : req.body)
            );
        } catch(err) {
            next(err);
        }
    }
}

module.exports = MonitoringController;

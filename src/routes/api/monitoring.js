const {MonitoringController} = include('controllers');
const {roles} = include('enums');

const {validateUserRole} = require('../middlewares');

module.exports = router => {
    router.post('/',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        MonitoringController.getMonitoring);
    return router;
};

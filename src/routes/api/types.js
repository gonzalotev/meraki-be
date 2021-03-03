const {TypeController} = include('controllers');
const {roles} = include('enums');

const {validateUserRole} = require('../middlewares');

module.exports = router => {
    router.get('/state/:state/ups', validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR, roles.TEAM_LEADER]), TypeController.getUps);
    router.get('/state/:state/ups/:ups/areas', validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR, roles.TEAM_LEADER]), TypeController.getAreas);
    router.get('/state/:state/ups/:ups/area/:area/segments', validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]), TypeController.getSegments);
    router.get('/files', TypeController.getFiles);
    router.get('/statuses', TypeController.getStatuses);
    router.get('/assignmentType', TypeController.getAssignmentsTypes);
    router.get('/situations/:status/status', TypeController.getSituations);
    return router;
};

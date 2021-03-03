const {ReviewController} = include('controllers');
const {roles} = include('enums');

const {
    validateUserRole, validateStateOrSubCoordinatorRole
} = require('../middlewares');

module.exports = router => {
    router.get('/', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER
    ]), ReviewController.getSurveys);
    router.get('/:id/address', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER
    ]), ReviewController.getSurveyById);
    router.put('/:id/finish', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER
    ]), validateStateOrSubCoordinatorRole, ReviewController.finishSurvey);
    router.put('/:id/approve', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR
    ]), validateStateOrSubCoordinatorRole, ReviewController.approveSurvey);
    router.put('/:id/reassign/:user', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER
    ]), validateStateOrSubCoordinatorRole, ReviewController.reassignSurvey);
    router.put('/:id/reopen', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER]), validateStateOrSubCoordinatorRole, ReviewController.reopenSurvey);
    router.put('/:id/recovery', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER
    ]), validateStateOrSubCoordinatorRole, ReviewController.recoverySurvey);
    router.put('/:id/supervision/:user', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR
    ]), validateStateOrSubCoordinatorRole, ReviewController.superviseSurvey);
    router.get('/:id', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR,
        roles.TEAM_LEADER
    ]), validateStateOrSubCoordinatorRole, ReviewController.getSurveyData);
    return router;
};

const {AssignmentController} = include('controllers');
const {roles} = include('enums');

const {
    validateUserState, validateUserRole
} = require('../middlewares');

module.exports = router => {
    router.get('/assignmentsByArea',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        validateUserState,
        AssignmentController.getAssignmentsByArea
    );
    router.get('/assignmentsBySegment',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        validateUserState,
        AssignmentController.getAssignmentsBySegment
    );
    router.get('/assignmentsByUps',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        validateUserState,
        AssignmentController.getAssignmentsByUps
    );
    router.get('/assignmentsByAddress',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        validateUserState,
        AssignmentController.getAssignmentsByAddress
    );
    router.get('/addressesToReassign',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        validateUserState,
        AssignmentController.getAddressesToReassign
    );
    router.put('/',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        AssignmentController.assignByArea
    );
    router.put('/segment',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        AssignmentController.assignBySegment
    );
    router.put('/address',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        AssignmentController.assignByAddress
    );
    router.put('/addressesToReassign',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        AssignmentController.reassignByAddress
    );
    router.put('/subCoordinator',
        validateUserRole([roles.NATIONAL_COORDINATOR, roles.COORDINATOR, roles.SUB_COORDINATOR]),
        AssignmentController.assignSubCoordinator
    );
    return router;
};

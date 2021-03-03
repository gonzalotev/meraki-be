const {UserController} = include('controllers');
const {roles} = include('enums');
const {
    validateUserRole,
    validateUserState
} = require('../middlewares');

module.exports = router => {
    router.get('/session', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR
    ]), UserController.session);
    router.route('/:id')
        .get(validateUserRole([
            roles.NATIONAL_COORDINATOR,
            roles.COORDINATOR,
            roles.SUB_COORDINATOR
        ]), validateUserState, UserController.fetchUser)
        .put(validateUserRole([
            roles.NATIONAL_COORDINATOR,
            roles.COORDINATOR,
            roles.SUB_COORDINATOR
        ]), UserController.updateUser)
        .delete(validateUserRole([
            roles.NATIONAL_COORDINATOR,
            roles.COORDINATOR,
            roles.SUB_COORDINATOR
        ]), UserController.deleteUser);

    router.route('/')
        .get(validateUserRole([
            roles.NATIONAL_COORDINATOR,
            roles.COORDINATOR,
            roles.SUB_COORDINATOR
        ]), validateUserState, UserController.fetchUsers)
        .post(validateUserRole([
            roles.NATIONAL_COORDINATOR,
            roles.COORDINATOR,
            roles.SUB_COORDINATOR
        ]), UserController.newUser);

    router.post('/password/recovery', validateUserRole([
        roles.NATIONAL_COORDINATOR,
        roles.COORDINATOR,
        roles.SUB_COORDINATOR
    ]), UserController.askPasswordRecovery);

    return router;
};

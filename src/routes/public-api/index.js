const {UserController} = include('controllers');

module.exports = router => {
    router.post('/login', UserController.login);
    router.post('/session', UserController.validateSession);
    return router;
};

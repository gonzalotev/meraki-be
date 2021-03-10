const {UserController} = include('controllers');

module.exports = router => {
    router.get('/session', UserController.getSession);
    router.route('/:id')
        .get(UserController.fetchUser)
        .put(UserController.updateUser)
        .delete(UserController.deleteUser);

    router.route('/')
        .get(UserController.fetchUsers)
        .post( UserController.newUser);

    router.post('/password/recovery', UserController.askPasswordRecovery);

    return router;
};

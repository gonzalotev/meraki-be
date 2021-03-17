const { UserRoleController } = include('controllers');

module.exports = router => {
    router.route('/')
        .get(UserRoleController.fetch)
        .post(UserRoleController.create);
    return router;
};
